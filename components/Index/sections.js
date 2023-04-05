import React, { useEffect, useState } from "react";
import langswitch from "../Utils/langswitch";

export default function Adsf(){
  const [rows, setRows] = useState([]);

  useEffect(() => {
    langswitch.GetJsonM("menu").then((menu) => {
      const sections = Object.values(menu["product"]).map((p) => p.section);
      const uniqueSections = [...new Set(sections)];
      const updatedRows = uniqueSections.map((section) => {
        let imgg = section.toUpperCase().replace(" ", "_");
        imgg = imgg.replace(" ", "_");
        imgg = imgg.replace("Ö", "O");
        imgg = imgg.replace("Ä", "A");
        imgg = imgg.replace("Ü", "U");
        if (
          section in menu["sections"]["mdesc"] &&
          "img" in menu["sections"]["mdesc"][section]
        ) {
          imgg = menu["sections"]["mdesc"][section]["img"].toUpperCase();
        }
        return (
          <div className="col-lg-3 col-md-4 col-sm-6 col-xs-6" key={section}>
            <a
              className="a-item a-item-2"
              style={{ backgroundImage: `url(Images/${imgg}.jpeg)` }}
              href={langswitch.RouteP(`sectionmenu?section=${section}`)}
            >
              <div className="a-sub">{section}</div>
            </a>
          </div>
        );
      });
      setRows(updatedRows);
    });
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <div className="row g-2">{rows}</div>
    </div>
  );
};
