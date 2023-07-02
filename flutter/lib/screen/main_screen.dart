import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get/get_core/src/get_main.dart';

import '../provider/user_state.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(

    );
  }
}
class BottomNavigator extends StatefulWidget {
  static final String id = '/bottom';

  const BottomNavigator({Key? key}) : super(key: key);

  @override
  State<BottomNavigator> createState() => _BottomNavigatorState();
}

class _BottomNavigatorState extends State<BottomNavigator> with TickerProviderStateMixin {
  List<Widget> _widgetOptions = [];
  late TabController _bottomTabController;
  int _currentIndex = 0;

  @override
  void initState() {
    super.initState();
    _widgetOptions = [MainScreen(),MainScreen(),MainScreen(),MainScreen()];
    _bottomTabController = TabController(length: 4, vsync: this);
    // _bottomTabController.animateTo(0);
  }

  @override
  Widget build(BuildContext context) {
    final us = Get.put(UserState());

    return Scaffold(
      bottomNavigationBar: Container(
        child: TabBar(
          onTap: (index) {
            setState(() {
              _currentIndex = index;
            });
          },
          indicatorColor: Colors.transparent,
          indicatorSize: TabBarIndicatorSize.label,
          controller: _bottomTabController,
          unselectedLabelStyle: TextStyle(fontSize: 12),
          labelStyle: TextStyle(fontSize: 12,),
          unselectedLabelColor: Colors.grey,
          labelColor: const Color(0xff3D6177),
          tabs: <Widget>[
            Tab(
              text: '홈',
            ),
            Tab(
              text: '커뮤니티',
            ),
            Tab(
              text: '마이페이지',
            ),
            Tab(
              text: '마이페이지',
            )
          ],
        ),
      ),
      body: TabBarView(
        physics: const NeverScrollableScrollPhysics(),
        children: _widgetOptions,
        controller: _bottomTabController,
      ),
    );
  }
}
