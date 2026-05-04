import 'package:app/features/auth/controller/log_in_vm.dart';
import 'package:app/features/auth/view/log_in_page.dart';
import 'package:app/features/home/view/home_page.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MultiProvider(providers: [
      ChangeNotifierProvider(create: (_) => LogInVm())
    ],
    child:
    MaterialApp(
      initialRoute: '/Log_in' ,
      routes: {
        '/Log_in' : (context) => LogInPage(),
        '/HomePage' : (context) => HomePage()
      },
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: .fromSeed(seedColor: Colors.deepPurple),
      ),
      home: LogInPage(),
    ),);
    
  }
}

