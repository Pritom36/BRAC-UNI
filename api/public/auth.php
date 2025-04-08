<?php
require_once 'bootstrap.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Prevent direct file access
if (!defined('SECURE_ACCESS')) {
    http_response_code(403);
    die(json_encode(['error' => 'Direct access not allowed']));
}

function generateDeviceId() {
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
    $ip = $_SERVER['REMOTE_ADDR'] ?? '';
    $uniqueId = $userAgent . $ip . session_id();
    return hash('sha256', $uniqueId);
}

function verifyPin($storedPin, $inputPin) {
    return hash('sha256', $inputPin) === $storedPin;
}

function isDateExpired($dateStr) {
    $expiryDate = strtotime($dateStr);
    $currentDate = time();
    
    if ($expiryDate === false) {
        return true;
    }
    
    return $currentDate > $expiryDate;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Handle token verification
    if (isset($data['action']) && $data['action'] === 'verify') {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
        if (preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
            $token = $matches[1];
            $tokenData = explode(':', base64_decode($token));
            
            if (count($tokenData) === 2) {
                $username = sanitize_input($tokenData[0]);
                $deviceId = $tokenData[1];
                
                $usersFile = __DIR__ . '/../private/users.json';
                $users = json_decode(file_get_contents($usersFile), true);
                
                foreach ($users['users'] as $user) {
                    if ($user['username'] === $username && 
                        $user['deviceId'] === $deviceId && 
                        $user['isActive'] && 
                        !isDateExpired($user['expiryDate'])) {
                        http_response_code(200);
                        echo json_encode(['success' => true]);
                        exit;
                    }
                }
            }
        }
        http_response_code(401);
        echo json_encode(['error' => 'Invalid or expired session']);
        exit;
    }

    // Handle logout
    if (isset($data['action']) && $data['action'] === 'logout') {
        $username = sanitize_input($data['username'] ?? '');
        $deviceId = $data['deviceId'] ?? '';
        
        if (empty($username) || empty($deviceId)) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing username or device ID']);
            exit;
        }
        
        $usersFile = __DIR__ . '/../private/users.json';
        $users = json_decode(file_get_contents($usersFile), true);
        
        foreach ($users['users'] as &$user) {
            if ($user['username'] === $username && $user['deviceId'] === $deviceId) {
                $user['deviceId'] = null;
                file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT));
                http_response_code(200);
                echo json_encode(['success' => true]);
                exit;
            }
        }
        
        http_response_code(400);
        echo json_encode(['error' => 'User not found']);
        exit;
    }
    
    // Handle login
    if (isset($data['action']) && $data['action'] === 'login') {
        $username = sanitize_input($data['username'] ?? '');
        $pin = $data['pin'] ?? '';
        $deviceId = $data['deviceId'] ?? '';
        
        if (empty($username) || empty($pin) || empty($deviceId)) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields']);
            exit;
        }
        
        $usersFile = __DIR__ . '/../private/users.json';
        $users = json_decode(file_get_contents($usersFile), true);
        
        foreach ($users['users'] as &$user) {
            if ($user['username'] === $username) {
                if (!$user['isActive']) {
                    http_response_code(401);
                    echo json_encode(['error' => 'Account is disabled']);
                    exit;
                }
                
                if (isDateExpired($user['expiryDate'])) {
                    http_response_code(401);
                    echo json_encode(['error' => 'Your PIN has expired']);
                    exit;
                }
                
                if (!verifyPin($user['pin'], $pin)) {
                    http_response_code(401);
                    echo json_encode(['error' => 'Invalid credentials']);
                    exit;
                }
                
                if (!empty($user['deviceId']) && $user['deviceId'] !== $deviceId) {
                    http_response_code(401);
                    echo json_encode(['error' => 'Already logged in on another device']);
                    exit;
                }
                
                $user['deviceId'] = $deviceId;
                $user['lastLogin'] = date('Y-m-d H:i:s');
                file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT));
                
                echo json_encode([
                    'success' => true,
                    'expiryDate' => $user['expiryDate']
                ]);
                exit;
            }
        }
    }
    
    $username = sanitize_input($data['username'] ?? '');
    $pin = $data['pin'] ?? '';
    
    if (empty($username) || empty($pin)) {
        http_response_code(400);
        echo json_encode(['error' => 'Username and pin are required']);
        exit;
    }
    
    $usersFile = __DIR__ . '/../private/users.json';
    $users = json_decode(file_get_contents($usersFile), true);
    
    foreach ($users['users'] as &$user) {
        if ($user['username'] === $username) {
            // Check if account is active
            if (!$user['isActive']) {
                http_response_code(401);
                echo json_encode(['error' => 'Account is disabled']);
                exit;
            }
            
            // Check if pin has expired
            if (strtotime($user['expiryDate']) < time()) {
                http_response_code(401);
                echo json_encode(['error' => 'Your secret pin has expired']);
                exit;
            }
            
            // Verify pin
            if (!verifyPin($user['pin'], $pin)) {
                http_response_code(401);
                echo json_encode(['error' => 'Invalid credentials']);
                exit;
            }
            
            $deviceId = generateDeviceId();
            
            // Check if pin is already in use on another device
            if (!empty($user['deviceId']) && $user['deviceId'] !== $deviceId) {
                http_response_code(401);
                echo json_encode(['error' => 'This secret pin is already in use on another device']);
                exit;
            }
            
            // Update device ID and last login
            $user['deviceId'] = $deviceId;
            $user['lastLogin'] = date('Y-m-d H:i:s');
            file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT));
            
            // Generate and return token
            $token = base64_encode($username . ':' . $deviceId);
            echo json_encode([
                'success' => true,
                'token' => $token,
                'expiryDate' => $user['expiryDate']
            ]);
            exit;
        }
    }
    
    http_response_code(401);
    echo json_encode(['error' => 'Invalid credentials']);
    exit;
}

// Handle invalid request method
http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
?>