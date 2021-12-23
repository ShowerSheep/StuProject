<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<jsp:useBean id="userBean" class="save.data.Register" scope="request"/>
<HEAD><%@ include file="head.html" %></HEAD>
<title>注册页面</title>
<style>
    #ok{
        font-family:Monaco;font-size:26px;color:black;
    }
    #yes{
        font-family:Monaco;font-size:18px;color:black;
    }
</style>

<HTML><body id=ok background =image/background.jpg>
<div align="center">
    <form action="registerServlet" method="post">
        <table id=ok>
            用户名由字母、数字、下划线构成，*注释的项必须填写。
            <tr><td>*用户名称:</td>
                <td><input type=text id=ok name="logname" /></td>
                <td>*用户密码:</td><td><input type=password id=ok name="password">
                </td></tr>
            <tr><td>*重复密码:</td><td>
                <input type=password id=ok name="again_password"></td>
                <td>联系电话:</td><td><input type=text id=ok name="phone"/></td></tr>
            <tr><td>邮寄地址:</td><td><input type=text id=ok name="address"/></td>
                <td>真实姓名:</td><td><input type=text id=ok name="realname"/></td>
                <td><input type=submit  id=ok value="提交"></td> </tr>
<%--            onclick="window.location.href='login.jsp'--%>
        </table>
    </form>
</div >
<div align="center">
    注册反馈：
    <jsp:getProperty name="userBean"  property="backNews" />
    <table id=yes border=3>
        <tr><td>会员名称:</td>
            <td><jsp:getProperty name="userBean" property="logname"/></td>
        </tr>
        <tr><td>姓名:</td>
            <td><jsp:getProperty name="userBean" property="realname"/></td>
        </tr>
        <tr><td>地址:</td>
            <td><jsp:getProperty name="userBean" property="address"/></td>
        </tr>
        <tr><td>电话:</td>
            <td><jsp:getProperty name="userBean" property="phone"/></td>
        </tr>
    </table></div >
</body></HTML>


