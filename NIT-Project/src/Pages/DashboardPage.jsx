import { useState } from "react";

function Dashboard() {
    const [test, setTest] = useState("")
    return(
        <h1 style={{color:"green"}}>Dashboard Component</h1>
    );
}

export default Dashboard;