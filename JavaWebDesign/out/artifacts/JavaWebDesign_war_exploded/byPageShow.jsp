<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<HEAD>
    <%@ include file="head.html" %>
</HEAD>
<title>分页浏览页面</title>
<style type="text/css">

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
<jsp:useBean id="dataBean" class="save.data.Record_Bean" scope="session"/>
<HTML>

<body>
<center>
    <jsp:setProperty name="dataBean" property="pageSize" param="pageSize"/>
    <jsp:setProperty name="dataBean" property="currentPage" param="currentPage"/>
    </p>
    <table class="gridtable" border=1>
        <% String[][] table = dataBean.getTableRecord();
            if (table == null) {
                out.print("没有记录");
                return;
            } %>
        <tr>
            <th>手机标识号</th>
            <th>手机名称</th>
            <th>手机制造商</th>
            <th>手机价格</th>
            <th>查看细节</th>
            <td>添加到购物车</td>
        </tr>
        <% int totalRecord = table.length;
            int pageSize = dataBean.getPageSize(); //每页显示的记录数。 int
            int totalPages = dataBean.getTotalPages();
            if (totalRecord % pageSize == 0)
                totalPages = totalRecord / pageSize;//总页数。 else totalPages=totalRecord/pageSize+1;
            dataBean.setPageSize(pageSize);
            dataBean.setTotalPages(totalPages);
            if (totalPages >= 1) {
                if (dataBean.getCurrentPage() < 1) dataBean.setCurrentPage(dataBean.getTotalPages());
                if (dataBean.getCurrentPage() > dataBean.getTotalPages())
                    dataBean.setCurrentPage(1);
                int index = (dataBean.getCurrentPage() - 1) * pageSize;
                int start = index; //table的currentPage页起始位置。
                for (int i = index; i < pageSize + index; i++) {
                    if (i == totalRecord) break;
                    out.print("<tr>");
                    for (int j = 0; j < table[0].length; j++) {
                        out.print("<td>" + table[i][j] + "</td>");
                    }
                    String detail =
                            "<a href='showDetail.jsp?mobileID=" + table[i][0] + "'>手机详情</a>";
                    out.print("<td>" + detail + "</td>");
                    String shopping =
                            "<a href='putGoodsServlet?mobileID=" + table[i][0] + "'>添加到购物车</a>";
                    out.print("<td>" + shopping + "</td>");
                    out.print("</tr>");
                }
            }
        %>
    </table>
    <p calss=table_b>全部记录数:
        <jsp:getProperty name="dataBean" property="totalRecords"/>
        。
        <br>每页最多显示
        <jsp:getProperty name="dataBean" property="pageSize"/>
        条记录。
        <br>当前显示第
        <jsp:getProperty name="dataBean" property="currentPage"/>
        页
        (共有
        <jsp:getProperty name="dataBean" property="totalPages"/>
        页)。
    </p>
    <table calss=table_b>
        <tr>
            <td>
                <form action="" method=post>
                    <input type=hidden name="currentPage" value="<%=dataBean.getCurrentPage()-1 %>"/>
                    <input type=submit calss=table_b value="上一页"/>
                </form>
            </td>
            <td>
                <form action="" method=post>
                    <input type=hidden name="currentPage" value="<%=dataBean.getCurrentPage()+1 %>"/>
                    <input type=submit calss=table_b value="下一页">
                </form>
            </td>
            <td>
                <form action="" calss=table_b method=post>
                    输入页码：<input type=textcalss=table_b name="currentPage" size=2>
                    <input type=submit calss=table_b value="提交">
                </form>
            </td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td>
                <form action="" calss=table_b method=post>
                    每页显示<input type=text calss=table_b name="pageSize" value=<%=dataBean.getPageSize()%> size=1>
                    条记录<input type=submit calss=table_b value="确定"></form>
            </td>
        </tr>
    </table>
</center>
</body>

</HTML>