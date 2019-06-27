<?php
	echo '<p>Приветос!</p>';
	class ConnectionToDB{
		private static $instance;
	/*	public $testProp = 'проверка';
		public function test(){
			echo $this->testProp;
		}*/
		private function __construct(){
			require_once('../includes/configuration.php');
			$host = Configuration::$host;	
			$userName = Configuration::$userName;	
			$password = Configuration::$password;	
			$DBName = Configuration::$DBName;	
		}
		public static function getInstance(){
			if (!self::$instance){
				self::$instance = new self();
			}
			return self::$instance;
		}
		private $connectionObject;
		public function getConnectionObject(){
			if (!$this->connectionObject){
				$connectionObject = mysqli_connect($host,$userName,$password,$DBName)
					or die('<p>Ошибка подключения к БД!</p>');
				$this->connectionObject = $connectionObject;
			}
			return $connectionObject;
		}
		
	}
	$connectionObject = ConnectionToDB::getInstance()->getConnectionObject();
?>

	
	