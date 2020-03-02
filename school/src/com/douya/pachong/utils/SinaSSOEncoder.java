package com.douya.pachong.utils;


import java.util.Date;

public class SinaSSOEncoder {

	    private boolean i=false;
	    private int g=8;
	    
	    public SinaSSOEncoder(){
	        
	    }
	    
	    public static void main(String[] args) {
	    	SinaSSOEncoder sp = new SinaSSOEncoder();
	    	//entry=weibo&gateway=1&from=&savestate=7&useticket=1&vsnf=1&ssosimplelogin=1&su=eGlhbmdsaW5oYWlfbGluaGFpJTQwMTYzLmNvbQ%3D%3D&service=miniblog&servertime=1351044373&nonce=SZRO7Y&pwencode=rsa2&rsakv=1330428213&sp=255add616208697190991e1e4eef31ad8f4669611634e078521a22eec254bf6ff2a8e563f6faed2cd05768874831726dd8feddb9a26e0867b133daae2605766319598fa77b67e4dd02ac23eb28c604a4b227fe79110bf67524cbe9622ad4419cb3570b93bc92d986b508bd0a376409f9893649cf26a87c223e48dd2ef6a000d3&encoding=UTF-8&prelt=82&url=http%3A%2F%2Fweibo.com%2Fajaxlogin.php%3Fframelogin%3D1%26callback%3Dparent.sinaSSOController.feedBackUrlCallBack&returntype=META
	    	String pass = sp.encode("1137260940", "1351044373", "SZRO7Y");
	    	System.out.println("pass "+pass);
	    	pass = new SinaSSOEncoder().encode("1137260940", sp.getServerTime(), "SZRO7Y");
	    	System.out.println(" pass 2"+pass);

		}
	    
	    private String getServerTime(){
	        long servertime = new Date().getTime()/1000;
	        return String.valueOf(servertime);
	    }

	    
	    public String encode(String psw,String servertime,String nonce){
	        String password;
	        password=hex_sha1(""+hex_sha1(hex_sha1(psw))+servertime+nonce);
	        return password;
	    }
	    
	  	private String hex_sha1(String j) {
	        return h(b(f(j,j.length()*g), j.length() * g));
	    }
	    private String h(int[] l){
	        String k = i ? "0123456789ABCDEF" : "0123456789abcdef";
	        String m = "";
	        for (int j = 0; j < l.length * 4; j++) {
	            m += k.charAt((l[j >> 2] >> ((3 - j % 4) * 8 + 4)) & 15) + "" + k.charAt((l[j >> 2] >> ((3 - j % 4) * 8)) & 15);
	        }
	        return m;
	    }
	    
	    private int[] b(int[] A,int r){
	        A[r>>5]|=128<<(24-r%32);
	        A[((r+64>>9)<<4)+15]=r;
	        int[] B = new int[80];
	        int z = 1732584193;
	        int y = -271733879;
	        int v = -1732584194;
	        int u = 271733878;
	        int s = -1009589776;
	        for (int o = 0; o < A.length; o += 16) {
	            int q = z;
	            int p = y;
	            int n = v;
	            int m = u;
	            int k = s;
	            for (int l = 0; l < 80; l++) {
	                if (l < 16) {
	                    B[l] = A[o + l];
	                } else {
	                    B[l] = d(B[l - 3] ^ B[l - 8] ^ B[l - 14] ^ B[l - 16], 1);
	                }
	                int C = e(e(d(z, 5), a(l, y, v, u)), e(e(s, B[l]), c(l)));
	                s = u;
	                u = v;
	                v = d(y, 30);
	                y = z;
	                z = C;
	            }
	            z = e(z, q);
	            y = e(y, p);
	            v = e(v, n);
	            u = e(u, m);
	            s = e(s, k);
	        }
	        return new int[]{z,y,v,u,s};
	    }
	    
	    private int a(int k,int j,int m,int l){
	        if(k<20){return(j&m)|((~j)&l);};
	        if(k<40){return j^m^l;};
	        if(k<60){return(j&m)|(j&l)|(m&l);};
	        return j^m^l;
	    }
		 private int c(int j){
	        return(j<20)?1518500249:(j<40)?1859775393:(j<60)?-1894007588:-899497514;
	    }
		private int e(int j, int m) {
	        int l = (j & 65535) + (m & 65535);
	        int k = (j >> 16) + (m >> 16) + (l >> 16);
	        return (k << 16) | (l & 65535);
	    }
		private int d(int j,int k){
	        return(j<<k)|(j>>>(32-k));
	    }
	    
	    private int[] f(String m,int r){
	        int[] l;
	        int j = (1<<this.g)-1;
	        int len=((r+64>>9)<<4)+15;
	        int k;
	        for(k=0;k<m.length()*g;k+=g){
	            len = k>>5>len?k>>5:len;
	        }
	        l = new int[len+1];
	        for(k=0;k<l.length;k++){
	            l[k]=0;
	        }
	        for(k=0;k<m.length()*g;k+=g){
	            l[k>>5]|=(m.charAt(k/g)&j)<<(24-k%32);
	        }
	        return l;
	    }


}
