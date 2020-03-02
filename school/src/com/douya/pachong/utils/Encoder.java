package com.douya.pachong.utils;


import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Encoder {
	
	//entry=weibo&gateway=1&from=&savestate=7&useticket=1&vsnf=1&ssosimplelogin=1&su=eGlhbmdsaW5oYWlfbGluaGFpJTQwMTYzLmNvbQ%3D%3D&service=miniblog&servertime=1351044373&nonce=SZRO7Y&pwencode=rsa2&rsakv=1330428213&sp=255add616208697190991e1e4eef31ad8f4669611634e078521a22eec254bf6ff2a8e563f6faed2cd05768874831726dd8feddb9a26e0867b133daae2605766319598fa77b67e4dd02ac23eb28c604a4b227fe79110bf67524cbe9622ad4419cb3570b93bc92d986b508bd0a376409f9893649cf26a87c223e48dd2ef6a000d3&encoding=UTF-8&prelt=82&url=http%3A%2F%2Fweibo.com%2Fajaxlogin.php%3Fframelogin%3D1%26callback%3Dparent.sinaSSOController.feedBackUrlCallBack&returntype=META
	public static void main(String[] args) {
        Long servertime = new Long(1351044373);
        String nonce = "SZRO7Y";
        String password = "1137260940";
        Encoder encoder = new Encoder();
        String firstDigest = encoder.generateDigest(password, "sha1");
        //System.out.println(firstDigest);
        String secondDigest = encoder.generateDigest(firstDigest, "sha1");
        //System.out.println(secondDigest);
        String encodedPassword = encoder.generateDigest(secondDigest + servertime + nonce, "sha1");
        System.out.println(encodedPassword);
    }

    private final char[] digits = { '0', '1', '2', '3', '4', '5', '6',
            '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };
    
    public String generateDigest(String content, String algorithm) {
        MessageDigest digest = null;
        try {
            digest = java.security.MessageDigest.getInstance(algorithm);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace(System.out);
        }
        if(null == digest)
        	return null;
        
        digest.update(content.getBytes());
        
        byte[] hash = digest.digest();
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < hash.length; i++) {
            sb.append(getByteAsHexString(hash[i]));
        }
        return sb.toString();
    }
    
    private String getByteAsHexString(byte b) {
        char[] buf = new char[2];
        int radix = 1 << 4;
        int mask = radix - 1;
        buf[1] = digits[(int) (b & mask)];
        b >>>= 4;
        buf[0] = digits[(int) (b & mask)];
        return new String(buf);
    }

}
