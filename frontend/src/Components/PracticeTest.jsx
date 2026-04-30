import React,{useState}  from "react";

function PracticeTest(){
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(false);


    const testFetch  = async( )=>{
        setLoading(true);

        try{
            const response = await fetch("http://localhost:5000/api/mezmur?day=Monday");
            const result = await response.json();
            setData(result);
        }
        catch(err){
            console.error("Fetch faild:",err);

        }
        finally{
            setLoading(false);
        }
    };
   

    return(
        <div>
            <button onClick={testFetch} disabled={loading}>
                {loading ? "Loading Ai response" : "test practice api"}
            </button>
            {data && (
                <div style={{marginTop: '20px',border:'2px solid #cc',padding: '10px'}}>
                    <h4>Topic: {data.topic}</h4>
                    <p>{data.spiritual_story.content}</p> 
                    
                    </div>
            )}
        </div>
    )
}
export default PracticeTest;