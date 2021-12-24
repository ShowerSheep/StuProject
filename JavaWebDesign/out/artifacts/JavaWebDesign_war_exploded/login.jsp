<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<jsp:useBean id="loginBean" class="save.data.Login" scope="session"/>
<HTML>
<HEAD>
    <%@ include file="head.html" %>
</HEAD>
<title>登录页面</title>
<link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="css/my-login.css">
<script src="js/jquery.min.js"></script>
<script src="bootstrap/js/bootstrap.min.js"></script>
<script src="js/my-login.js"></script>
<style>
    #tom {
        font-family: Monaco;
        font-size: 20px;
        color: black
    }

</style>

<body class="my-login-page" bgcolor="#ffc0cb">

<section class="h-100">
    <div class="container h-100">
        <div class="row justify-content-md-center h-100">
            <div class="card-wrapper">
                <div class="card fat">
                    <div class="card-body">
                        <h4 class="card-title">登录</h4>
                        <form method="POST" action="loginServlet">

                            <div class="form-group">
                                <label for="tom">登录名称</label>

                                <input id="tom" type="text" class="form-control" name="logname" value="" required
                                       autofocus>
                            </div>

                            <div class="form-group">
                                <label for="tom">密码</label>
                                <input id="tom" type="password" class="form-control" name="password" required data-eye>
                            </div>

                            <div class="form-group no-margin">
                                <input type="submit" class="btn btn-primary btn-block"/>

                            </div>
                            <div class="margin-top20 text-center">
                                没有账户？<a href="inputRegisterMess.jsp">注册</a>
                            </div>
                        </form>
                    </div>
                    <div align="center">
                        登录反馈信息:<br>
                        <jsp:getProperty name="loginBean" property="backNews"/>
                        <jsp:getProperty name="loginBean" property="logname"/>

                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</body>




</HTML>