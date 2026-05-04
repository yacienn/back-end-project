import 'package:app/core/api/api_service.dart';
import 'package:app/features/auth/model/auth_model.dart';
import 'package:flutter/material.dart';

class LogInVm extends ChangeNotifier {
  final emailController = TextEditingController();
  final passwordController = TextEditingController();

  final ApiService apiService = ApiService();

  String? errorMessage;

  Future<void> logIn() async { 
    errorMessage = null;
    notifyListeners();

  
    final log = AuthModel(
      email: emailController.text,
      password: passwordController.text,
    );

    final body = log.toJson();

    // 4. call backend
    final response = await apiService.post("log_in", body);

    // 5. handle response
    if (response["success"]) {
      print("LOGIN SUCCESS");
      print(response["data"]);
    } else {
      errorMessage = response["data"]["message"];
      print("LOGIN FAILED: $errorMessage");
    }

    // 6. stop loading

    notifyListeners();
  }

  @override
  void dispose() {
    emailController.dispose();
    passwordController.dispose();
    super.dispose();
  }
}
