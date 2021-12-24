<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<jsp:useBean id="userBean" class="save.data.Register" scope="request"/>
<HTML>
<HEAD>
    <%@ include file="head.html" %>
</HEAD>
<title>注册页面</title>
<style>
    #ok {
        font-family: Monaco;
        font-size: 20px;
        color: black;
    }

    #yes {
        font-family: Monaco;
        font-size: 20px;
        color: black;
    }
</style>
<link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="css/my-login.css">
<script src="js/jquery.min.js"></script>
<script src="bootstrap/js/bootstrap.min.js"></script>
<script src="js/my-login.js"></script>


<body bgcolor="#ffc0cb" class="my-login-page">

<section class="h-100">
    <div class="container h-100">
        <div class="row justify-content-md-center h-100">
            <div class="card-wrapper">
                <div class="card fat">
                    <div class="card-body">
                        <h4 class="card-title">注册</h4>

                        <form action="registerServlet" method="POST">

                            <div class="form-group">
                                <label for="name">*用户名(*为必填)</label>
                                <input id="name" type="text" class="form-control" name="logname" required autofocus>
                            </div>

                            <div class="form-group">
                                <label for="password1">*用户密码</label>
                                <input id="password1" type="password" class="form-control" name="password" required
                                       data-eye>
                            </div>

                            <div class="form-group">
                                <label for="password2">*重复密码</label>
                                <input id="password2" type="password" class="form-control" name="again_password"
                                       required
                                       data-eye>
                            </div>

                            <div class="form-group">
                                <label>联系电话</label>
                                <input type="text" class="form-control" name="phone">
                            </div>

                            <div class="form-group">
                                <label>邮寄地址</label>
                                <input type="text" class="form-control" name="address">
                            </div>

                            <div class="form-group">
                                <label>真实姓名</label>
                                <input type="text" class="form-control" name="realname">
                            </div>

                            <div class="form-group">
                                <label>
                                    <input type="checkbox" name="aggree" value="1" checked="checked"> 我同意条款和条件
                                </label>
                            </div>

                            <div class="form-group no-margin">
                                <input type="submit" class="btn btn-primary btn-block">
                                    注册
                                </input>
                            </div>
                            <div class="margin-top20 text-center">
                                已经有账户? <a href="login.jsp">登录</a>
                            </div>
                        </form>
                        <div align=" center">
                            注册反馈：
                            <jsp:getProperty name="userBean" property="backNews"/>

                            <div>
<%--                            <table id=yes border=3>--%>
<%--                                <tr>--%>
<%--                                    <td>会员名称:</td>--%>
<%--                                    <td>--%>
<%--                                        <jsp:getProperty name="userBean" property="logname"/>--%>
<%--                                    </td>--%>
<%--                                </tr>--%>
<%--                                <tr>--%>
<%--                                    <td>姓名:</td>--%>
<%--                                    <td>--%>
<%--                                        <jsp:getProperty name="userBean" property="realname"/>--%>
<%--                                    </td>--%>
<%--                                </tr>--%>
<%--                                <tr>--%>
<%--                                    <td>地址:</td>--%>
<%--                                    <td>--%>
<%--                                        <jsp:getProperty name="userBean" property="address"/>--%>
<%--                                    </td>--%>
<%--                                </tr>--%>
<%--                                <tr>--%>
<%--                                    <td>电话:</td>--%>
<%--                                    <td>--%>
<%--                                        <jsp:getProperty name="userBean" property="phone"/>--%>
<%--                                    </td>--%>
<%--                                </tr>--%>
</div>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>



</body>

</HTML>