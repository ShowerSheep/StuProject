package handle.data;

import save.data.*;

import java.sql.*;
import java.io.*;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import javax.sql.DataSource;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

//@WebServlet("/loginServlet")
public class HandleLogin extends HttpServlet {
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
    }

    public void service(HttpServletRequest request,
                        HttpServletResponse response)
            throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        Connection con = null;
        Statement sql;
        String logname = request.getParameter("logname").trim(),
                password = request.getParameter("password").trim();
        password = Encrypt.encrypt(password, "javajsp");//给用户密码加密。
        boolean boo = (logname.length() > 0) && (password.length() > 0);
        try {
            Context context = new InitialContext();
            Context contextNeeded = (Context) context.lookup("java:comp/env");
            DataSource ds =
                    (DataSource) contextNeeded.lookup("mobileConn");//获得连接池。
            con = ds.getConnection();//使用连接池中的连接。
            String condition = "select * from user where logname = '" + logname +
                    "' and password ='" + password + "'";
            sql = con.createStatement();
            if (boo) {
                ResultSet rs = sql.executeQuery(condition);
                boolean m = rs.next();
                if (m == true) {
                    //调用登录成功的方法:
                    success(request, response, logname, password);
                    RequestDispatcher dispatcher =
                            request.getRequestDispatcher("login.jsp");//转发
                    dispatcher.forward(request, response);
                } else {
                    String backNews = "登录失败，您输入的用户名不存在，或密码不般配";
                    //调用登录失败的方法:
                    fail(request, response, logname, backNews);
                }
            } else {
                String backNews = "请输入用户名和密码";
                fail(request, response, logname, backNews);
            }
            con.close();//连接返回连接池。
        } catch (SQLException exp) {
            String backNews = "" + exp;
            fail(request, response, logname, backNews);
        } catch (NamingException exp) {
            String backNews = "没有设置连接池" + exp;
            fail(request, response, logname, backNews);
        } finally {
            try {
                con.close();
            } catch (Exception ee) {
            }
        }
    }

    public void success(HttpServletRequest request,
                        HttpServletResponse response,
                        String logname, String password) {
        Login loginBean = null;
        HttpSession session = request.getSession(true);
        try {
            loginBean = (Login) session.getAttribute("loginBean");
            if (loginBean == null) {
                loginBean = new Login();  //创建新的数据模型 。
                session.setAttribute("loginBean", loginBean);
                loginBean = (Login) session.getAttribute("loginBean");
            }
            String name = loginBean.getLogname();
            if (name.equals(logname)) {
                loginBean.setBackNews(logname + "登录成功");
                loginBean.setLogname(logname);

            } else {  //数据模型存储新的登录用户:
                loginBean.setBackNews(logname + "登录成功");
                RequestDispatcher dispatcher=
                        request.getRequestDispatcher("lookMobile.jsp");
                dispatcher.forward(request, response);//转发
                loginBean.setLogname(logname);
            }
        } catch (Exception ee) {
            loginBean = new Login();
            session.setAttribute("loginBean", loginBean);
            loginBean.setBackNews(ee.toString());
            loginBean.setLogname(logname);
        }
    }

    public void fail(HttpServletRequest request,
                     HttpServletResponse response,
                     String logname, String backNews) {
        response.setContentType("text/html;charset=utf-8");
        try {
            PrintWriter out = response.getWriter();
//            out.println("<html><body>");
//            out.println("<h2>" + logname + "登录结果<br>" + backNews + "</h2>");
//            out.println("返回登录页面或主页<br>");
//            out.println("<a href =login.jsp>重新登录</a>");
//            out.println("<br><a href =index.jsp>返回主页</a>");
//            out.println("</body></html>");

            out.println("<jsp:useBean id=\"loginBean\" class=\"save.data.Login\" scope=\"session\"/>\n" +
                    "<HTML>\n" +
                    "<HEAD>\n" +
                    "</HEAD>\n" +
                    "<title>登录页面</title>\n" +
                    "<link rel=\"stylesheet\" type=\"text/css\" href=\"bootstrap/css/bootstrap.min.css\">\n" +
                    "<link rel=\"stylesheet\" type=\"text/css\" href=\"css/my-login.css\">\n" +
                    "<script src=\"js/jquery.min.js\"></script>\n" +
                    "<script src=\"bootstrap/js/bootstrap.min.js\"></script>\n" +
                    "<script src=\"js/my-login.js\"></script>\n" +
                    "<style>\n" +
                    "    #tom {\n" +
                    "        font-family: Monaco;\n" +
                    "        font-size: 20px;\n" +
                    "        color: black\n" +
                    "    }\n" +
                    "    .page111{\n" +
                    "        text-align: center;\n" +
                    "    }\n" +
                    "</style>\n" +
                    "\n" +
                    "<body class=\"my-login-page\" bgcolor=\"#ffc0cb\">\n" +
                    "<div class=\"page111\">\n" +
                    "    <p id=jerry>手机销售网</p>\n" +
                    "    <table cellSpacing=\"1\" cellPadding=\"1\" width=\"900\" align=\"center\" border=\"0\">\n" +
                    "        <tr valign=\"bottom\">\n" +
                    "            <td id=tom><a href=\"inputRegisterMess.jsp\">注册</a></td>\n" +
                    "            <td id=tom><a href=\"login.jsp\">登录</a></td>\n" +
                    "            <td id=tom><a href=\"lookMobile.jsp\">浏览手机</a></td>\n" +
                    "            <td id=tom><a href=\"searchMobile.jsp\">查询手机</a></td>\n" +
                    "            <td id=tom><a href=\"lookShoppingCar.jsp\">查看购物车</a></td>\n" +
                    "            <td id=tom><a href=\"lookOrderForm.jsp\">查看订单</a></td>\n" +
                    "            <td id=tom><a href=\"exitServlet\">退出</a></td>\n" +
                    "            <td id=tom><a href=\"index.jsp\">主页</a></td>\n" +
                    "        </tr>\n" +
                    "    </table>\n" +
                    "</div>\n" +
                    "<section class=\"h-100\">\n" +
                    "    <div class=\"container h-100\">\n" +
                    "        <div class=\"row justify-content-md-center h-100\">\n" +
                    "            <div class=\"card-wrapper\">\n" +
                    "                <div class=\"card fat\">\n" +
                    "                    <div class=\"card-body\">\n" +
                    "                        <h4 class=\"card-title\">登录</h4>\n" +
                    "                        <form method=\"POST\" action=\"loginServlet\">\n" +
                    "\n" +
                    "                            <div class=\"form-group\">\n" +
                    "                                <label for=\"tom\">登录名称</label>\n" +
                    "\n" +
                    "                                <input id=\"tom\" type=\"text\" class=\"form-control\" name=\"logname\" value=\"\" required\n" +
                    "                                       autofocus>\n" +
                    "                            </div>\n" +
                    "\n" +
                    "                            <div class=\"form-group\">\n" +
                    "                                <label for=\"tom\">密码</label>\n" +
                    "                                <input id=\"tom\" type=\"password\" class=\"form-control\" name=\"password\" required data-eye>\n" +
                    "                            </div>\n" +
                    "\n" +
                    "                            <div class=\"form-group no-margin\">\n" +
                    "                                <input type=\"submit\" class=\"btn btn-primary btn-block\"/>\n" +
                    "\n" +
                    "                            </div>\n" +
                    "                            <div class=\"margin-top20 text-center\">\n" +
                    "                                没有账户？<a href=\"inputRegisterMess.jsp\">注册</a>\n" +
                    "                            </div>\n" +
                    "                        </form>\n" +
                    "                    </div>\n" +
                    "                    <div align=\"center\">\n" +
                    "                        登录反馈信息:<br>\n" +
                    "                        用户不存在或密码不正确，请重新登录!\n" +
                    "\n" +
                    "                    </div>\n" +
                    "                </div>\n" +
                    "            </div>\n" +
                    "        </div>\n" +
                    "    </div>\n" +
                    "</section>\n" +
                    "</body>\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "</HTML>");
        } catch (IOException exp) {

        }
    }
}
