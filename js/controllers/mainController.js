app.controller('mainCtrl', ['mainService', "$rootScope", '$scope', '$location', function (mainService, $scope, $rootScope, $location) {
	let ctrl = this;
	let serv = mainService;


	//реєстрація
	$scope.per = {
		name: "",
		sname: "",
		login: "",
		phone: "",
		pass: ""
	}

	$scope.AddNewUser = function () {
		$scope.error_text = "";
		console.log($scope.per)
		serv.getUsers().then(response => {
			console.log('ctrluser response', response);
			ctrl.dataUsers = response;
			$scope.reg_num = 0;
			$scope.na = new RegExp(/^[А-ЯІЄЇ]{1}[а-яієї]{1,}/g);
			if ($scope.per.name.match($scope.na)) {
				angular.element(document.querySelector("#name")).css('border', '1px solid grey');
			} else {
				angular.element(document.querySelector("#name")).css('border', '1px solid red');
				$scope.reg_num++;

			}
			if ($scope.per.sname.match($scope.na)) {
				angular.element(document.querySelector("#sname")).css('border', '1px solid grey');
			} else {
				angular.element(document.querySelector("#sname")).css('border', '1px solid red');
				$scope.reg_num++;

			}
			$scope.lo = new RegExp(/^[A-Za-z_0-9]{7,}/g);
			if ($scope.per.login.match($scope.lo)) {
				angular.element(document.querySelector("#login")).css('border', '1px solid grey');
			} else {
				angular.element(document.querySelector("#login")).css('border', '1px solid red');
				$scope.reg_num++;

			}
			$scope.ph = new RegExp(/^(\+38)?\s?[0-9]{3}\s?[0-9]{7}$/g);

			if ($scope.per.phone.match($scope.ph)) {
				angular.element(document.querySelector("#phone")).css('border', '1px solid grey');
			} else {
				angular.element(document.querySelector("#phone")).css('border', '1px solid red');
				$scope.reg_num++;

			}
			$scope.pa = new RegExp(/^[A-Za-z\-_0-9]{7,}[^\;:"']/g);

			if ($scope.per.pass.match($scope.pa)) {
				angular.element(document.querySelector("#pass")).css('border', '1px solid grey');
			} else {
				angular.element(document.querySelector("#pass")).css('border', '1px solid red');
				$scope.reg_num++;

			}
			for (i = 0; i < ctrl.dataUsers.length; i++) {
				console.log(ctrl.dataUsers[i])
				if ($scope.per.login == ctrl.dataUsers[i].u_login ||
					$scope.per.pass == ctrl.dataUsers[i].u_pass) {
					$scope.error_text = "Такий логін чи пароль вже існують";
					$scope.reg_num = 1;
					break;
				}


			}
			if ($scope.reg_num == 0) {
				serv.addUser($scope.per)
				$scope.per = {};
			}

		})

	}

	$scope.CleanNewUser = function () {
		$scope.per = {};
		//		console.log($scope.regUser)
	}
	//авторизація
	$scope.logper = {
		id: "",
		name: "",
		sname: "",
		login: "",
		pass: "",
		phone: ""
	}

	$scope.logper_str = localStorage.getItem('persons')
	if (!$scope.logper_str) {

		$scope.enterend = false;
		$scope.admin = false;
	} else {
		$scope.logper = JSON.parse($scope.logper_str);
		if(($scope.logper.login==="admin1111")&&($scope.logper.pass==="qwerty1111")){
			$scope.admin=true;
		}
		console.log($scope.logper);
		$scope.enterend = true;

		if ($scope.enterend == true) {
			$scope.lett_per = $scope.logper.name.split('');
			console.log($scope.lett_per);
		}

	}

$scope.author_error_text='';
	$scope.dataUsers = [];
	$scope.getCtrlUsers = function () {
		serv.getUsers().then(response => {
			console.log('ctrluser response', response);
			ctrl.dataUsers = response;
			$scope.num = 0;
			for (i = 0; i < ctrl.dataUsers.length; i++) {
				console.log(ctrl.dataUsers[i])
				if ($scope.logper.login == ctrl.dataUsers[i].u_login &&
					$scope.logper.pass == ctrl.dataUsers[i].u_pass) {
					$scope.num += 1;
					break;
				}
			}
			console.log($scope.num);
			if ($scope.num != 0) {
				console.log($scope.num);
				console.log($scope.logper);
				$scope.logper.id = ctrl.dataUsers[i].id;
				$scope.logper.name = ctrl.dataUsers[i].u_name;
				$scope.logper.sname = ctrl.dataUsers[i].u_sname;
				$scope.logper.login = ctrl.dataUsers[i].u_login;
				$scope.logper.pass = ctrl.dataUsers[i].u_pass;
				$scope.logper.phone = ctrl.dataUsers[i].u_phone;
				console.log($scope.logper);
				localStorage.setItem('persons', JSON.stringify($scope.logper));
				$scope.lett_per = $scope.logper.name.split('');
				console.log($scope.lett_per);
				$scope.enterend = true;
				if(($scope.logper.login==="admin1111")&&($scope.logper.pass==="qwerty1111")){
			$scope.admin=true;
		}
			} else if (($scope.num) == 0) {
				console.log($scope.logper)
				console.log(ctrl.dataUsers)
				$scope.author_error_text='Неправильний логін чи пароль';
				
			}
			
		})
		
		
	}
	$scope.CleanCtrlUser = function () {
		$scope.logper = {};
		$scope.author_error_text='';
	}
	//вихід 
	$scope.End_session = function () {
		$scope.admin = false;
		$scope.enterend = false;
		localStorage.removeItem('persons');
		$scope.lett_per = null;
		$scope.goods_arr = [];
		localStorage.setItem('buygoods', JSON.stringify($scope.goods_arr));
		$scope.num_goods = 0;
		localStorage.setItem('buyelem', JSON.stringify($scope.num_goods));

	}
	//кількість елеметів у корзині
	$scope.num_goods = 0;
	$scope.save_num = localStorage.getItem('buyelem');
	if (!$scope.save_num) {
		localStorage.setItem('buyelem', JSON.stringify($scope.num_goods));
		$scope.save_num = localStorage.getItem('buyelem');
		console.log($scope.save_num)
	} else {
		$scope.num_goods = JSON.parse($scope.save_num)
		console.log($scope.num_goods)
	}

	//добавити бажаний продукт в кошик
	$scope.AddGood = function (x) {
		$scope.num_goods += 1;
		localStorage.setItem('buyelem', JSON.stringify($scope.num_goods));
		console.log($scope.num_goods);
		$scope.PushGoodsLocal(x)
	}
	$scope.goods_local = [];
	$scope.numb_goods_local = {
		code: "",
		name_good: "",
		brand: "",
		price: "",
		photo: "",
		weight: "",
		number_goods: 1
	}
	$scope.PushGoodsLocal = function (x) {
		$scope.goodYesNo = localStorage.getItem('buygoods');
		console.log($scope.goodYesNo);
		console.log(x);
		$scope.numb_goods_local.code = x.code_good;
		$scope.numb_goods_local.name_good = x.Name_good;
		$scope.numb_goods_local.brand = x.Brand;
		$scope.numb_goods_local.price = x.Price;
		$scope.numb_goods_local.photo = x.Photo;
		$scope.numb_goods_local.weight = x.Weight;
		if (!$scope.goodYesNo) {
			$scope.goods_local.push($scope.numb_goods_local);
			console.log($scope.goods_local);
			console.log($scope.numb_goods_local);
			localStorage.setItem('buygoods', JSON.stringify($scope.goods_local));
		} else {

			console.log($scope.goodYesNo);
			$scope.goods_arr = [];
			$scope.goods_arr_loc = JSON.parse($scope.goodYesNo);
			$scope.check = 0;
			for (i = 0; i < $scope.goods_arr_loc.length; i++) {
				if ($scope.goods_arr_loc[i].code == $scope.numb_goods_local.code) {
					$scope.goods_arr_loc[i].number_goods++;
					$scope.goods_arr.push($scope.goods_arr_loc[i]);
					$scope.check = 1;
				} else {
					$scope.goods_arr.push($scope.goods_arr_loc[i]);
				}
			}
			console.log($scope.goods_arr);
			if ($scope.check == 0) {
				$scope.goods_arr.push($scope.numb_goods_local);
			}
			console.log($scope.goods_arr);
			localStorage.setItem('buygoods', JSON.stringify($scope.goods_arr));
			console.log($scope.goods_arr);
			$scope.goods_arr = [];

		}
	}

	//кошик


	$scope.MinusOne = function (x) {

		$scope.goodYesNo = localStorage.getItem('buygoods');
		console.log($scope.goodYesNo);
		$scope.goods_arr = [];
		$scope.goods_arr_loc = JSON.parse($scope.goodYesNo);
		if (x.number_goods > 1) {
			for (i = 0; i < $scope.goods_arr_loc.length; i++) {
				if ($scope.goods_arr_loc[i].code != x.code) {
					$scope.goods_arr.push($scope.goods_arr_loc[i]);
				} else {
					$scope.goods_arr_loc[i].number_goods--;
					$scope.goods_arr.push($scope.goods_arr_loc[i]);
				}
			}
			localStorage.setItem('buygoods', JSON.stringify($scope.goods_arr));
		} else if (x.number_goods == 1) {
			for (i = 0; i < $scope.goods_arr_loc.length; i++) {
				if ($scope.goods_arr_loc[i].code != x.code) {
					$scope.goods_arr.push($scope.goods_arr_loc[i]);
				}
			}
			localStorage.setItem('buygoods', JSON.stringify($scope.goods_arr));
		}
		$scope.num_goods -= 1;
		localStorage.setItem('buyelem', JSON.stringify($scope.num_goods));
		console.log($scope.num_goods);
		$scope.goods_arr = [];
		$scope.select_goods_locStor();
	}
	$scope.PlusOne = function (x) {

		$scope.goodYesNo = localStorage.getItem('buygoods');
		console.log($scope.goodYesNo);
		$scope.goods_arr = [];
		$scope.goods_arr_loc = JSON.parse($scope.goodYesNo);

		for (i = 0; i < $scope.goods_arr_loc.length; i++) {
			if ($scope.goods_arr_loc[i].code != x.code) {
				$scope.goods_arr.push($scope.goods_arr_loc[i]);
			} else {
				$scope.goods_arr_loc[i].number_goods++;
				$scope.goods_arr.push($scope.goods_arr_loc[i]);
			}
		}
		localStorage.setItem('buygoods', JSON.stringify($scope.goods_arr));


		$scope.num_goods += 1;
		localStorage.setItem('buyelem', JSON.stringify($scope.num_goods));
		console.log($scope.num_goods);
		$scope.goods_arr = [];
		$scope.select_goods_locStor();
	}
	$scope.DeleteGood = function (x) {

		$scope.goodYesNo = localStorage.getItem('buygoods');
		console.log($scope.goodYesNo);
		$scope.goods_arr = [];
		$scope.goods_arr_loc = JSON.parse($scope.goodYesNo);

		for (i = 0; i < $scope.goods_arr_loc.length; i++) {
			if ($scope.goods_arr_loc[i].code != x.code) {
				$scope.goods_arr.push($scope.goods_arr_loc[i]);
			}

		}
		localStorage.setItem('buygoods', JSON.stringify($scope.goods_arr));

		$scope.num_goods = $scope.num_goods - x.number_goods;
		localStorage.setItem('buyelem', JSON.stringify($scope.num_goods));
		console.log($scope.num_goods);
		$scope.goods_arr = [];
		$scope.select_goods_locStor();
	}

	$scope.select_goods_locStor = function () {

		$scope.ordLocStor = localStorage.getItem('buygoods');
		ctrl.goods_order = JSON.parse($scope.ordLocStor);
		$scope.common_price = 0;
		if (ctrl.goods_order != null)
			for (i = 0; i < ctrl.goods_order.length; i++) {
				$scope.common_price = $scope.common_price + (ctrl.goods_order[i].price * ctrl.goods_order[i].number_goods);

			}
	}
	
$scope.error_message = "";
	$scope.success_message = "";
	//відправлення замовлення
	$scope.SetOrder = function () {
		$scope.error_message = "";
		$scope.success_message = "";
		$scope.ordLocStor = localStorage.getItem('buygoods');

		if ($scope.enterend == false) {
			$scope.error_message = "Будь ласка, авторизуйтесь"
		} else if (!$scope.ordLocStor || $scope.ordLocStor == "[]") {
			$scope.error_message = "Виберіть товар"
		} else {
			$scope.logper_str = localStorage.getItem('persons');
			$scope.logper = JSON.parse($scope.logper_str);

			$scope.goods_order = JSON.parse($scope.ordLocStor);
			$scope.send_order_goods = [];
			$scope.new_order = new Date();
			$scope.last_order = new Date(400070000000);
			$scope.order = $scope.new_order - $scope.last_order;
			$scope.d = new Date();

			$scope.newDate_order = $scope.d.toDateString()
			//			$scope.d.toString();

			console.log($scope.order)
			console.log($scope.newDate_order)
//			$scope.send_order = {
//				id_order: $scope.order,
//				user_id: $scope.logper.id,
//				good_code: "",
//				count: "",
//				good_price: "",
//				user_phone: $scope.logper.phone,
//				date: $scope.newDate_order,
//				ready: false
//			}
			for (i = 0; i < $scope.goods_order.length; i++) {
				$scope.send_order = {
					id_order: $scope.order,
					user_id: $scope.logper.id,
					good_code: $scope.goods_order[i].code,
					count: $scope.goods_order[i].number_goods,
					good_price: $scope.goods_order[i].price * $scope.goods_order[i].number_goods,
					user_phone: $scope.logper.phone,
					date: $scope.newDate_order,
					ready: 0
				}

				console.log($scope.send_order)
				$scope.send_order_goods.push($scope.send_order)
				
				serv.addGoodOrder($scope.send_order)
				
			}
			localStorage.removeItem('buygoods');
		
		$scope.num_goods = 0;
		localStorage.setItem('buyelem', JSON.stringify($scope.num_goods));
			$scope.ordLocStor = localStorage.getItem('buygoods');
			console.log($scope.ordLocStor )
			ctrl.goods_order = JSON.parse($scope.ordLocStor);
			

			
			
			console.log($scope.send_order_goods)
			$scope.success_message = "Замовлення успішно виконане";

		}

	}
		$scope.select_goods_locStor();

	//детальніше 
	$scope.blur_h = 0;
	$scope.IncrSize = function (good) {
		$scope.foot_h = (angular.element(document.querySelector("#body_footer"))[0].offsetHeight);
		$scope.blur_h = (angular.element(document.querySelector(".outside_list"))[0].offsetHeight) + 50 + $scope.foot_h;
		console.log($scope.blur_h);
		console.log(good);
		$scope.choose_good = good;
		$scope.details = true;
		$scope.Big_size = 'big_size';
		$scope.value = true;
	}
	$scope.SmallSize = function () {
		$scope.details = false;

	}




	//	$scope.YourOrder = function(){
	//		console.log('helo')
	//		$scope.ordLocStor = localStorage.getItem('buygoods');
	//		ctrl.goods_order= JSON.parse($scope.ordLocStor);
	//		$scope.common_price=0;
	//		for(i=0; i<ctrl.goods_order.length; i++){
	//			$scope.common_price=$scope.common_price+ctrl.goods_order[i].Price
	//			for(j=0; j<ctrl.goods_order.length; j++){
	//				if(ctrl.goods_order[i].code_good==ctrl.goods_order[j].code_good){}

	//			}
	//		console.log(ctrl.goods_order)



	//	}
	//}


	//	$scope.dataHair = [];
	//	$scope.ShowHair = function () {
	//		serv.getHair().then(response => {
	//			console.log('ctrl response', response);
	//			ctrl.dataHair=response;
	//
	//		})
	//		
	//	}
	//		ctrl.dataAllBrands = [];
	$scope.ShowAllBrands = function () {
		serv.getAllBrands().then(response => {
			console.log('ctrl response', response);
			ctrl.dataAllBrands = response;
			console.log(ctrl.dataAllBrands)

		})

		console.log($scope.dataAllBrands)
	}
	$scope.ShowAllBrands();

	//	$scope.Show=function(){
	//	console.log($scope.dataHair);
	//	}
	//	$scope.dataCountries;
	//	ctrl.getCountries =function () {
	//			serv.getCountry().then(response => {
	//				console.log('country response', response);
	//				ctrl.dataCountries=response;
	//	
	//			})
	//			
	//		}
	//	
	//	ctrl.getCountries();
	//	console.log('country response', ctrl.dataCountries);

	//дані з сервера
	ctrl.getGoods = () => {
		let url = $location.path()
		let x = 'getHairGoods'
		let count = '1';
		console.log(url.indexOf('hairPage'))
		if (url.indexOf('hairPage') >= 0) {
			console.log()
			x = 'getHairGoods';
			count = '1';
		} else if (url.indexOf('nailPage') >= 0) {
			x = 'getNailGoods';
			count = '3';
		} else if (url.indexOf('bodyPage') >= 0) {
			x = 'getBodyGoods';
			count = '2';
		} else if (url.indexOf('facePage') >= 0) {
			x = 'getFaceGoods';
			count = '4';
		}
		serv.getGoods(x).then(response => {
			console.log('http', x)
			console.log('ctrl response', response);
			ctrl.dataGoods = response;
		})
		serv.getCountry(count).then(response => {
			console.log('country response', response);
			ctrl.dataCountries = response;

		})
		serv.getGroup(count).then(response => {
			console.log('country response', response);
			ctrl.dataGroups = response;

		})
		serv.getBrand(count).then(response => {
			console.log('country response', response);
			ctrl.dataBrands = response;

		})
	}
	ctrl.getGoods()
	console.log($location.path());

	$scope.SelectFunc = function () {

	}

	//передача даних
	//	ctrl.addData=function(){
	//    serv.addUser(ctrl.myObj)
	//	}

}])
