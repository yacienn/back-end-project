import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  final String baseUrl = "http://localhost:3000";

  Future<Map<String, dynamic>> post(
    String endpoint,
    Map<String, dynamic> body,
  ) async {
    final response = await http.post(
      Uri.parse("$baseUrl/$endpoint"),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode(body),
    );

    return _handle(response);
  }

  Future<Map<String, dynamic>> get(String endpoint) async {
    final response = await http.get(
      Uri.parse("$baseUrl/$endpoint"),
    );

    return _handle(response);
  }

  Map<String, dynamic> _handle(http.Response response) {
    final data = jsonDecode(response.body);

    return {
      "success": response.statusCode >= 200 &&
          response.statusCode < 300,
      "data": data,
    };
  }
}
