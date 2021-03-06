<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="save.data.Login" %>
<%@ page import="javax.sql.DataSource" %>
<%@ page import="javax.naming.Context" %>
<%@ page import="javax.naming.InitialContext" %>
<%@ page import="java.sql.*" %>
<jsp:useBean id="loginBean" class="save.data.Login" scope="session"/>
<HEAD>
    <%@ include file="head.html" %>
</HEAD>
<title>商品详情</title>
<style>
    #tom {
        font-family: Monaco;
        font-size: 20px;
        color: black
    }
    table.gridtable {
        font-family: verdana,arial,sans-serif;
        font-size:15px;
        color:#333333;
        border-width: 1px;
        border-color: #666666;
        border-collapse: collapse;
    }
    table.gridtable th {
        border-width: 1px;
        padding: 8px;
        border-style: solid;
        border-color: #666666;
        background-color: #dedede;
    }
    table.gridtable td {
        border-width: 1px;
        padding: 8px;
        border-style: solid;
        border-color: #666666;
        background-color: #ffffff;
    }
</style>
<HTML>
<body id=tom style="margin: 0 13px">
    <% try {
        loginBean = (Login) session.getAttribute("loginBean");
        if (loginBean == null) {
            response.sendRedirect("login.jsp");//重定向到登录页面.
            return;
        } else {
            boolean b = loginBean.getLogname() == null ||
                    loginBean.getLogname().length() == 0;
            if (b) {
                response.sendRedirect("login.jsp");//重定向到登录页面。
                return;
            }
        }
    } catch (Exception exp) {
        response.sendRedirect("login.jsp");//重定向到登录页面。
        return;
    }
        String mobileID = request.getParameter("mobileID");
        if (mobileID == null) {
            out.print("没有产品号，无法查看细节");
            return;
        }
        Context context = new InitialContext();
        Context contextNeeded = (Context) context.lookup("java:comp/env");
        DataSource ds = (DataSource) contextNeeded.lookup("mobileConn");//获得连接池。
        Connection con = null;
        Statement sql;
        ResultSet rs;
        try {
            con = ds.getConnection();//使用连接池中的连接。
            sql = con.createStatement();
            String query = "SELECT * FROM mobileForm where mobile_version = '" + mobileID + "'";
            rs = sql.executeQuery(query);
            out.print("<table class=\"gridtable\" align=\"center\">");
            out.print("<tr>");
            out.print("<th>产品号");
            out.print("<th>名称");
            out.print("<th>制造商");
            out.print("<th>价格");
            out.print("<th>放入购物车");
            out.print("</tr>");
            String picture = "background.jpg";
            String detailMess = "";
            while (rs.next()) {
                mobileID = rs.getString(1);
                String name = rs.getString(2);
                String maker = rs.getString(3);
                String price = rs.getString(4);
                detailMess = rs.getString(5);
                picture = rs.getString(6);
                out.print("<tr>");
                out.print("<td>" + mobileID + "</td>");
                out.print("<td>" + name + "</td>");
                out.print("<td>" + maker + "</td>");
                out.print("<td>" + price + "</td>");
                String shopping =
                        "<a href ='putGoodsServlet?mobileID=" + mobileID + "'>添加到购物车</a>";
                out.print("<td>" + shopping + "</td>");
                out.print("</tr>");
            }
            out.print("</table>");
            out.print("产品详情:<br>");
            String pic = "<img align=\"left\" src='image/" + picture + "'></img>";
            out.print(pic); //产片图片
            out.println("<div>" + detailMess + "<div>");
            con.close(); //连接返回连接池。
        } catch (SQLException exp) {
        } finally {
            try {
                con.close();
            } catch (Exception ee) {
            }
        }
    %>

</body>
</HTML>

