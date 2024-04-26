
import React, { useEffect, useState } from 'react'

import { Link, useLocation, useNavigate } from 'react-router-dom'

import * as EgovNet from 'api/egovFetch'
import { NOTICE_BBS_ID } from 'config'
import CODE from 'constants/code'
import URL from 'constants/url'

import EgovAttachFile from 'components/EgovAttachFile'
import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavInform'
import bbsFormVaildator from 'utils/bbsFormVaildator'

function EgovNoticeEdit(props) {
    console.group("EgovNoticeEdit");
    console.log("EgovNoticeEdit [props] : ", props);
    props = {mode: CODE.MODE_CREATE};

    const navigate = useNavigate();
    const location = useLocation();
    console.log("EgovNoticeEdit [location] : ", location);

    const bbsId = location.state?.bbsId || NOTICE_BBS_ID;
    const nttId = location.state?.nttId || "";

    const [modeInfo, setModeInfo] = useState({ mode: props.mode });
    const [masterBoard, setMasterBoard] = useState({});
    const [boardDetail, setBoardDetail] = useState({ nttSj: '', nttCn: '' });
    const [boardAttachFiles, setBoardAttachFiles] = useState();

    const initMode = () => {
        switch (props.mode) {
            case CODE.MODE_CREATE:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "등록",
                    method: "POST",
                    editURL: '/board'
                });
                break;
            case CODE.MODE_MODIFY:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "수정",
                    method: "PUT",
                    editURL: `/board/${nttId}`
                });
                break;
            case CODE.MODE_REPLY:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "답글쓰기",
                    method: "POST",
                    editURL: '/boardReply'
                });
                break;
			default:
                navigate({pathname: URL.ERROR}, {state: {msg : ""}});
        }
    }

    const updateBoard = () => {
        const formData = new FormData();
        for (let key in boardDetail) {
            formData.append(key, boardDetail[key]);
            //console.log("boardDetail [%s] ", key, boardDetail[key]);
        }

        if (bbsFormVaildator(formData)) {
            const requestOptions = {
                method: modeInfo.method,
                body: formData
            }
    
            EgovNet.requestFetch(modeInfo.editURL,
                requestOptions,
                (resp) => {
                    if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                        navigate(URL.INFORM_NOTICE, {state:{bbsId : bbsId}});
                    } else {
                        // alert("ERR : " + resp.message);
                        navigate({pathname: URL.ERROR}, {state: {msg : resp.resultMessage}});
                    }
                }
            );
        };
    };

	const Location = React.memo(function Location(masterBoard) {
        return (
            <div className="location">
                <ul>
                    <li><Link to={URL.MAIN} className="home">Home</Link></li>
                    <li><Link to={URL.ADMIN}>사이트관리</Link></li>
                    <li>{masterBoard && masterBoard.bbsNm}</li>
                </ul>
            </div>
        )
    });

    useEffect(function () {
        initMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.groupEnd("EgovNoticeEdit");

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <Location />
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div className="contents NOTICE_LIST" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">Order</h1>
                        </div>
                        
                        <h2 className="tit_2">{masterBoard && masterBoard.bbsNm} {modeInfo.modeTitle}</h2>

                        <div className="board_view2">
                            <dl>
                                <dt>
                                    <label htmlFor="nttSj">Order ID</label>
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="orderid" name="orderid" type="text"
                                        onChange={e => setBoardDetail({ ...boardDetail, orderid: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    <label htmlFor="nttSj">Restaurant ID</label>
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="restaurantid" name="restaurantid" type="text"
                                        onChange={e => setBoardDetail({ ...boardDetail, restaurantid: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    <label htmlFor="nttSj">Order Status</label>
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="status" name="status" type="text"
                                        onChange={e => setBoardDetail({ ...boardDetail, status: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    <label htmlFor="nttSj">Order Status 유형</label>
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="statustype" name="statustype" type="text"
                                        onChange={e => setBoardDetail({ ...boardDetail, statustype: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            </dl>
                            {/* <!-- 버튼영역 --> */}
                            <div className="board_btn_area">
                                <div className="left_col btn1">
                                    <button className="btn btn_skyblue_h46 w_100"
                                        onClick={() => updateBoard()}>저장</button>
                                </div>

                                <div className="right_col btn1">
                                    <Link to={URL.INFORM_NOTICE} className="btn btn_blue_h46 w_100">목록</Link>
                                </div>
                            </div>
                            {/* <!--// 버튼영역 --> */}
                        </div>

                        {/* <!--// 본문 --> */}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default EgovNoticeEdit;