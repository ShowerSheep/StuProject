package handle.data;
import save.data.Record_Bean;
import java.sql.*;
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.sql.DataSource;
import javax.naming.Context;
import javax.naming.InitialContext;
public class SearchByCondition extends HttpServlet{
    public void init(ServletConfig config) throws ServletException{
        super.init(config);
    }
    public void service(HttpServletRequest request,
                        HttpServletResponse response) throws ServletException,IOException{
        request.setCharacterEncoding("utf-8");
        HttpSession session=request.getSession(true);
        String searchMess= request.getParameter("searchMess");
        String radioMess= request.getParameter("radio");
        if(searchMess==null||searchMess.length()==0) {
            response.getWriter().print("没有查询信息，无法查询");
            return;
        }
        Connection con=null;
        String queryCondition="";
        float max=0,min=0;
        if(radioMess.contains("mobile_version")){
            queryCondition =
                    "SELECT mobile_version,mobile_name,mobile_made,mobile_price "+
                            "FROM mobileForm where mobile_version='"+searchMess+"'";
        }
        else if(radioMess.contains("mobile_name")) {
            queryCondition =
                    "SELECT mobile_version,mobile_name,mobile_made,mobile_price "+
                            "FROM mobileForm where mobile_name like '%"+searchMess+"%'";
        }
        else if(radioMess.contains("mobile_price")) {
            String priceMess[] = searchMess.split("[-]+");
            try{
                min = Float.parseFloat(priceMess[0]);
                max = Float.parseFloat(priceMess[1]);
            }
            catch(NumberFormatException exp){
                min = 0;
                max = 0;
            }
            queryCondition =
                    "SELECT mobile_version,mobile_name,mobile_made,mobile_price "+
                            "FROM mobileForm where mobile_price<="+max+" and mobile_price>="+min;
        }
        Record_Bean dataBean=null;
        try{
            dataBean=(Record_Bean)session.getAttribute("dataBean");
            if(dataBean==null){
                dataBean=new Record_Bean();  //创建bean。
                session.setAttribute("dataBean",dataBean);//是session bean。
            }
        }
        catch(Exception exp){}
        try{
            Context  context = new InitialContext();
            Context  contextNeeded=(Context)context.lookup("java:comp/env");
            DataSource ds=
                    (DataSource)contextNeeded.lookup("mobileConn");//获得连接池。
            con= ds.getConnection();//使用连接池中的连接。
            Statement sql=con.createStatement();
            ResultSet rs=sql.executeQuery(queryCondition);
            ResultSetMetaData metaData = rs.getMetaData();
            int columnCount = metaData.getColumnCount(); //得到结果集的列数。
            rs.last();
            int rows=rs.getRow();  //得到记录数。
            String [][] tableRecord=dataBean.getTableRecord();
            tableRecord = new String[rows][columnCount];
            rs.beforeFirst();
            int i=0;
            while(rs.next()){
                for(int k=0;k<columnCount;k++)
                    tableRecord[i][k] = rs.getString(k+1);
                i++;
            }
            dataBean.setTableRecord(tableRecord); //更新bean。
            con.close(); //连接返回连接池。
            response.sendRedirect("byPageShow.jsp"); //重定向。
        }
        catch(Exception e){
            response.getWriter().print(""+e);
        }
        finally{
            try{
                con.close();
            }
            catch(Exception ee){}
        }
    }
}
