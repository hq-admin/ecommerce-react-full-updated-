import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

export default function Home() {
  const [userStats, setUserStats] = useState([])

  const MONTHS = useMemo(()=>
  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],[])

  useEffect(()=> {
    const getStats = async() => {
      try {
        const res = await userRequest.get("/users/stats")
        
        res.data.map((item)=>
          setUserStats((prev)=> [
            ...prev,
            {name: MONTHS[item._id - 1], "Active User": item.total},
          ])
        )
      } catch{}
    }
    getStats()
  }, [MONTHS])
  
  return (
    <div className="home">
      <Topbar/>
      <div className="sub">
        <Sidebar/>
        <div className="sub2">
          <FeaturedInfo />
          <Chart data={userStats} title="User Analytics" grid dataKey="Active User"/>
          <div className="homeWidgets">
          
            <WidgetSm/>
            <WidgetLg/>
        </div>
        </div>
      </div>
    </div>
  );
}
