import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          Center(
              child: GestureDetector(
                onTap: (){

                },
                  child: Text('11')))
        ],
      ),
    );
  }
  Future<void> test(String recipientEmail, String emailSubject, String emailBody) async {
    print('3232');
    final url = 'http://192.168.0.25:3000/send-email';
    final body = {
      'recipientEmail': recipientEmail,
      'emailSubject': emailSubject,
      'emailBody': emailBody,
    };
    final response = await http.post(Uri.parse(url), body: jsonEncode(body));
    print('dddddddddddd${response}');
    if (response.statusCode != 200) {
      throw Exception('Failed to send email');
    }
  }
}
