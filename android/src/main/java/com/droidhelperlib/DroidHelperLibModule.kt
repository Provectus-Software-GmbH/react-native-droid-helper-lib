package com.droidhelperlib

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.Callback

class DroidHelperLibModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

  // Declare android application context
  private val context = reactContext.applicationContext

  // Declare DroidHelper with the current context
  private val droidHelper = DroidHelper(context)

  @ReactMethod
  fun getCurrentSignatureForPackage(callback: Callback) {
    // return the current signature for the package
    callback.invoke(droidHelper.getCurrentSignatureForPackage())
  }

  @ReactMethod
  fun getRedirectUriForBroker(callback: Callback) {
    // return the redirect URI for the MSAL broker
    callback.invoke(droidHelper.getRedirectUriForBroker())
  }

  @ReactMethod
  fun isInstalledOnWorkProfile(callback: Callback) {
    // return if the app is installed on a work profile
    callback.invoke(droidHelper.isInstalledOnWorkProfile())
  }

  companion object {
    const val NAME = "DroidHelperLib"
  }
}
