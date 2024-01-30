import React from 'react';

const CsOne = () => {

    return (
        <div className="cs_one_wrap">
            <div>
                <div className="cs_one_title"><h2>1대1 문의</h2></div>                                                    
                <div className="cs_one_subscribe">답변은 기입하신 이메일로 발송됩니다</div>
                <br />
                <div className="cs_one_form_table_wrap">
                    <form className="cs_one_form_table">
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                <label htmlFor="category">문의 유형 선택</label>
                                </td>
                                <td>
                                <select id="category" name="category">
                                    <option value="option1">사이트 이용</option>
                                    <option value="option2">결제 관련</option>
                                    <option value="option3">회원가입</option>
                                </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <label>이름:</label>
                                </td>
                                <td>
                                <input type="text" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <label>이메일:</label>
                                </td>
                                <td>
                                <input type="email" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <label>문의 내용:</label>
                                </td>
                                <td>
                                <textarea rows="4"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                <button type="submit">문의 제출</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>   
        </div>
    );
};

export default CsOne;