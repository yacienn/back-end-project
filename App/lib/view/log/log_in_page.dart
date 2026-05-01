import 'package:app/controller/log_in_vm.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class LogInPage extends StatefulWidget {
  const LogInPage({super.key});

  @override
  State<LogInPage> createState() => _LogInPageState();
}

class _LogInPageState extends State<LogInPage> {
  
    @override
  Widget build(BuildContext context) {
    final vm = context.watch<LogInVm>();
    return Scaffold(
      appBar: AppBar(title: Text("Log_in"), centerTitle: true,),
      body: Padding(padding: EdgeInsets.all(25), 
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
             TextField(
              controller: vm.emailController,
              decoration: InputDecoration(
                label: Text("email"),
                border: OutlineInputBorder(),
              ),
             ), SizedBox(height: 20,),
             TextField(
              controller: vm.passwordController,
              decoration: InputDecoration(
                label: Text("password"),
                border: OutlineInputBorder(),
              ),
             ), SizedBox(height: 20,),
             ElevatedButton(onPressed: ()=> context.read<LogInVm>().logIn(), child: Text("log_in"))
          ],
        ),
      ),),
      
    );
  }
  
}