<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.sql.*" %>
<%@ page import="javax.sql.DataSource" %>
<%@ page import="javax.naming.Context" %>
<%@ page import="javax.naming.InitialContext" %>
<HEAD>
    <%@ include file="head.html" %>
</HEAD>
<title>浏览手机页面</title>
<style>
    #ok {
        font-family: Monaco;
        font-size: 20px;
        color: black;
    }
</style>
<HTML>
<body id=ok>
<div align="center">
    <br><br><br><br>
    选择手机的操作系统,分页显示这类手机。<br><br>
    <% Connection con = null;
        Statement sql;
        ResultSet rs;
        Context context = new InitialContext();
        Context contextNeeded = (Context) context.lookup("java:comp/env");
        DataSource ds = (DataSource) contextNeeded.lookup("mobileConn");//获得连接池。
        try {
            con = ds.getConnection();//使用连接池中的连接。
            sql = con.createStatement();
            //读取mobileClassify表，获得分类：
            rs = sql.executeQuery("SELECT * FROM mobileClassify");
            out.print("<form action='queryServlet' id =ok method ='post'>");
            out.print("<select id =ok name='fenleiNumber'>");
            while (rs.next()) {
                int id = rs.getInt(1);
                String mobileCategory = rs.getString(2);
                out.print("<option value =" + id + ">" + mobileCategory + "</option>");
            }
            out.print("</select>");
            out.print("<input type ='submit' id =ok value ='提交'>");
            out.print("</form>");
            rs.close();
            con.close();//连接返回连接池。
        } catch (SQLException e) {
            out.print(e);
        } finally {
            try {
                con.close();
            } catch (Exception ee) {
            }
        }
    %>
</div>
</body>
</HTML>
