package com.droidhelperlib

import android.annotation.SuppressLint
import android.app.admin.DevicePolicyManager
import android.content.Context
import android.content.pm.PackageInfo
import android.content.pm.PackageManager
import android.util.Base64
import java.security.MessageDigest

class DroidHelper(context: Context) {
  // Declare a context
  private val context = context.applicationContext

  // Method to get the redirect URI for MSAL broker
  fun getRedirectUriForBroker(): String {
    // Get the current signature for the package
    val signatureDigest = getCurrentSignatureForPackage()
    // Check if the signature is null or empty
    if (signatureDigest.isEmpty()) return ""
    // Build and return redirect URI
    return String.format(
      "msauth://%s/%s",
      context.packageName.lowercase(),
      signatureDigest
    )
  }

  fun getCurrentSignatureForPackageOld(): String {
    @Suppress("DEPRECATION")
    @SuppressLint("PackageManagerGetSignatures")
    val packageInfo: PackageInfo? = context.packageManager.getPackageInfo(context.packageName, PackageManager.GET_SIGNATURES)
    @Suppress("DEPRECATION")
    if (packageInfo != null && packageInfo.signatures != null && packageInfo.signatures.isNotEmpty()) {
      // First available signature. Applications can be signed with multiple signatures.
      // The order of Signatures is not guaranteed.
      val signature = packageInfo.signatures[0]
      val md: MessageDigest = MessageDigest.getInstance("SHA")
      md.update(signature.toByteArray())
      return Base64.encodeToString(md.digest(), Base64.NO_WRAP)
      // Server side needs to register all other tags. ADAL will
      // send one of them.
    }
    return ""
  }

  // Method to get the current signature for the package
  fun getCurrentSignatureForPackage(): String {
    // Get the package info for the current package
    val packageInfo = context.packageManager.getPackageInfo(
      context.packageName, PackageManager.GET_SIGNING_CERTIFICATES
    ) ?: return ""
    // Get the first available signature from the signing certificate history
    val signature = packageInfo.signingInfo?.signingCertificateHistory?.firstOrNull() ?: return ""
    // Compute the SHA digest of the signature
    val messageDigest = java.security.MessageDigest.getInstance("SHA")
    messageDigest.update(signature.toByteArray())
    // Encode the digest to a Base64 string and return it
    return android.util.Base64.encodeToString(messageDigest.digest(), android.util.Base64.NO_WRAP)
  }



  // Method to check if the app is installed on a work profile
  fun isInstalledOnWorkProfile(): Boolean {
    // Get the DevicePolicyManager service
    val devicePolicyManager = context.getSystemService(Context.DEVICE_POLICY_SERVICE) as? DevicePolicyManager
    // Get the list of active admins
    val activeAdmins = devicePolicyManager?.activeAdmins ?: return false
    for (admin in activeAdmins) {
      // Check if the package is a profile owner app
      if (devicePolicyManager.isProfileOwnerApp(admin.packageName)) {
        return true
      }
    }
    return false
  }

}
