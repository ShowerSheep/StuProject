<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<HEAD>
    <%@ include file="head.html" %>
</HEAD>
<title>查询页面</title>
<style>
    #tom {
        font-family: Monaco;
        font-size: 20px;
        color: black;
    }
</style>
<HTML>
<body id=tom>
<div align="center">
    <p id=tom>查询时可以输入手机的<i style="color: red">版本号</i>或<i style="color: red">手机名称</i>及<i style="color: red">价格</i>。<br>
        手机名称支持<i style="color: red">模糊查询</i>。
        <br>输入价格是在2个值之间的价格，格式是：<br>价格1-价格2
        例如：800-10000。
    </p>
    <form action="searchByConditionServlet" id=tom method="post">
        <br>输入查询信息:<input type=text id=tom name="searchMess"><br>
        <input type=radio name="radio" id=tom value="mobile_version"/>
            按手机版本号查询<br>
        <input type=radio name="radio" id=tom value="mobile_name">
            按照手机名称查询<br>
        <input type=radio name="radio" value="mobile_price" checked="ok">
            按照手机价格查询<br>
        <br><input type=submit id=tom value="提交">
    </form>
</div>
</body>
</HTML>

