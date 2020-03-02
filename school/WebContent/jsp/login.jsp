<%@ page contentType="text/html;charset=UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>微信CRM 客服登录</title>

<link type="text/css" rel="stylesheet"
	href="./styles/css/login/style.css" />

<script type="text/javascript">
	if (window != top)
		top.location.href = location.href;
</script>
<script language="javascript" type="text/javascript"
	src="./pageJs/md5.js"></script>
<script type="text/javascript">
	function submitThis(e, t) {
		var username = document.getElementById('username').value;
		var password = document.getElementById('password').value;
		document.getElementById('password').value = hex_md5(password);
		document.getElementById('loginForm').submit();
	};
</script>

</head>

<body>
	<form id="loginForm" action="./home.do" method="post">
		<div class="main">
			<div class="logotop"></div>
			<div class="logoname">
				<ul class="logonameinput">
					<li>用户名<br> <input type="text" name="j_username"
							id="username" value="${username }" class="logoinput" /></li>
					<li>密码<br> <input type="password" name="j_password"
							id="password" class="logoinput" /></li>
					<li><input name="input" type="button" value="登录"
						class="logoinputbutton" onclick="submitThis(null);" />&nbsp;&nbsp;&nbsp;<a
						href="./home.do?method=forgetkey">忘记密码？</a></li>
					<li><br /> <input type="hidden" name="tp" value="web" /></li>
					<li><span style="color: red;">${msg }</span></li>
				</ul>

			</div>
			<div class="logolinkcm">
				<ul class="linkul">
					<li>尊敬的用户：<br>欢迎使用R&R 软件如有问题，请点击<a href="">用户使用手册</a></li>
					<li>尊敬的用户：<br>欢迎使用R&R 软件，如需培训，请查看<a href="">视频培训demo</a></li>
					<li>使用过程中如需帮助，请<a href="">点击在线客</a>服进行咨询
					</li>
				</ul>
			</div>
			<div class="logonote">
				<ul class="noteul">
					<li class="titleli">建议</li>
					<li class="noteli">尊敬的用户，如果您在产品使用过程中有什么好的意见或建议，可发送邮件至：<a
						href="">java_php_wmb@126.com</a>。
					</li>
				</ul>
				<ul class="noteul01">
					<li class="titleli">新用户</li>
					<li class="noteli">尊敬的新用户，如需获取您的用户名和密码，请联系豆芽科技R&R 软件管理员。</li>
				</ul>
			</div>
			<div class="logobutton"></div>
		</div>
	</form>
</body>
</html>
