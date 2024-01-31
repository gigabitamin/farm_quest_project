import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CsLink from "./CsLink";
import CsIndex from "./CsIndex";
import CsNotice from "./CsNotice";
import CsFaq from "./CsFaq";
import CsOne from "./CsOne";
import CsMain from "./CsMain";
import CsDetail from "./CsDetail";


const CsRouter = () => {

    return (
        <div>
            <Routes>      
                <Route path="/cs_link" element={<CsLink />} />
                <Route path="/cs_index" element={<CsIndex />} />
                <Route path="/cs_notice" element={<CsNotice/>} />
                <Route path="/cs_faq" element={<CsFaq />} />
                <Route path="/cs_one" element={<CsOne />} />
                <Route path="/cs_main" element={<CsMain />} />
                <Route path="/cs_detail" element={<CsDetail />} />
            </Routes>
        </div>
    );
};

export default CsRouter;