import 'package:flutter/material.dart';

class LogInVm extends ChangeNotifier{
   final emailController = TextEditingController();
   final passwordController = TextEditingController();

   void logIn(){
    notifyListeners();
   } 
   
    @override
  void dispose() {
    emailController.dispose();
    passwordController.dispose();
    super.dispose();
  }
}