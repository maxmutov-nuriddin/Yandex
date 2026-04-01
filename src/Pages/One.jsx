import { useNavigate } from "react-router-dom";

function One() {
  const navigate = useNavigate();

  return (
    <div>
      <button className="rounded-xl w-78 h-14 hover:bg-gray-200   bg-[rgb(239,239,239)]" onClick={() => navigate("/global")}>
        <div className="flex items-center gap-4  justify-center">
         <img className="w-12" src="/2.png" alt="" />
          <h1> Ona va bolalar uchun </h1>
        </div>
      </button>


      <button className="rounded-xl w-78 h-14 hover:bg-gray-200   bg-[rgb(239,239,239)]" onClick={() => navigate("/globaltwo")}>
        <div className="flex items-center gap-4  justify-center">
         <img className="w-12" src="/1zamon.png" alt="" />
          <h1> Zamonaviy bozor </h1>
        </div>
      </button>
  


  <button className="rounded-xl w-78 h-14 hover:bg-gray-200   bg-[rgb(239,239,239)]" onClick={() => navigate("/globalcenter")}>
        <div className="flex items-center gap-4  justify-center">
         <img className="w-12" src="/8-mart.png" alt="" />
          <h1> 8-mart </h1>
        </div>
      </button>
    </div>
  );
}

export default One;


