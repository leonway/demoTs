package com.demots;
import android.os.Bundle;
import android.content.Intent;
import android.os.Handler;
import android.content.Context;

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "demoTs";
  }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
        //以及发送间隔
        // MobclickAgent.setSessionContinueMillis(1000);
        // ShareModule.initSocialSDK(this);
        // //统计的场景
        // MobclickAgent.setScenarioType(this, MobclickAgent.EScenarioType.E_UM_NORMAL);
    }
}
