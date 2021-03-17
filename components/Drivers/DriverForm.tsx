import React, { useEffect, useState, useRef } from "react";
import LayoutMobile from "../../components/LayoutMobile";
import Select from "react-select";
import getCoupon from "../../api/getCoupon";
import sendQuery from "../../api/sendQuery";
import TextField from "../../components/Widgets/TextField";
import {
  nameValidate,
  emailValidate,
  phoneValidate,
  passengerValidate,
} from "../../functions/validations";
import Button from "../../components/Widgets/Button";
import getMember from "../../api/getMember";
import { ListPorps } from "../../utils/types";
import DateTimeLocalPicker from "../../components/Widgets/DateTimePicker";
import CheckBox from "../../components/Widgets/CheckBox";
import errorListCheck from "../../functions/errorCheck";
import Alert from "../../components/Widgets/Modal";
import useCoupon from "../../api/useCoupon";
import { DateY_M_D_hms } from "../../functions/dateFormater";

type Props = {
  ServiceCode: string;
  Service: string;
};

type member = {
  acctid: number;
  phone: string;
};
export default function DriverForm({ ServiceCode, Service }: Props) {
  const [acctid, setAcctid] = useState(0);

  useEffect(() => {}, []);

  const color = "#114879";

  const bgColor = "#f8fafc";

  const fontColor = "#114879";

  const acctidRef = useRef<HTMLDivElement>(null);

  const [couponOptions, setCoupon] = useState<ListPorps[]>([]);

  const [couponData, setCouponData] = useState<any>([]);

  const [couponIndex, setCouponIndex] = useState(0);

  const [alert, setAlert] = useState({
    alertText: "",
    open: false,
    backPage: false,
    loading: false,
  });

  const [errorCheck, setError] = useState({
    UserName: false,
    Cellphone: false,
    Email: false,
    DeparturePlace: false,
    ArrivalPlace: false,
    RepresentativeName: false,
    NumberOfPassengers: false,
    PassengerPhoneNumber: false,
  });

  const [OrderData, setData] = useState({
    AcctId: "",
    IdNumber: "",
    UserName: "",
    Telephone: "",
    Cellphone: "",
    Email: "",
    CouponCode: "",
    CouponName: "",
    ServiceCode: ServiceCode,
    Service: Service,
    DriverTimeOfArrival: "",
    CarType: "",
    FlightNo: "",
    DeparturePlace: "",
    ArrivalPlace: "",
    TripDescription: "",
    Message: "",
    Fax: "",
    RepresentativeName: "",
    NumberOfPassengers: "",
    PassengerPhoneNumber: "",
    NumberOfLargeLuggage: "",
    NumberOfMiddleLuggage: "",
    InvoiceReceiveName: "",
    InvoiceCategory: "",
    InvoiceTitle: "",
    InvoiceCompanyNumber: "",
    InvoiceAddress: "",
    RefundType: "",
  });

  useEffect(() => {
    const tempid = parseInt(acctidRef.current?.textContent ?? "0");
    if (tempid == 0) {
      return;
    }
    flutterCall();
  }, [acctidRef]);

  function flutterCall() {
    const tempid = parseInt(acctidRef.current?.textContent ?? "0");
    setAcctid(tempid);
    fetchMember(tempid);
  }

  const fetchMember = async (tempid: number) => {
    const orgData = await getMember(tempid);
    // console.log(orgData["Data"]);
    if (orgData["Data"] == null) {
      return;
    }
    const tempData = orgData["Data"];
    setData({
      ...OrderData,
      AcctId: tempid.toString(),
      Email: tempData["Email"],
      UserName: tempData["AcctName"],
      Cellphone: tempData["MainCell"],
    });
    setError({
      ...errorCheck,
      Email: true,
      UserName: true,
      Cellphone: true,
    });
    fetchCoupon({ acctid: tempid, phone: tempData["MainCell"] });
  };

  const fetchCoupon = async ({ acctid, phone }: member) => {
    const temp = {
      acctID: acctid,
      phone: phone,
      source: ServiceCode,
    };
    const data = await getCoupon(temp);
    if (data["ReturnCode"] != 0) {
      return;
    }
    const couponList = data["Data"];
    if (couponList == null || couponList.length == 0) {
      return;
    }
    setCouponData(couponList);
    insertCouponData(couponList);
  };

  useEffect(() => {
    if (couponData.length > 0) {
      setData({
        ...OrderData,
        CouponCode: couponData[couponIndex].sequence_id,
        CouponName: couponData[couponIndex].coupon_name,
      });
    }
  }, [couponData]);

  function insertCouponData(list: any) {
    let tempList = [];
    let tempData = {} as ListPorps;
    for (let index in list) {
      tempData.value = index;
      tempData.label = list[index].coupon_name;
      tempList.push({ ...tempData });
    }
    setCoupon(tempList);
    selectCoupon({ value: "0", label: "" });
  }

  function selectCoupon(v: ListPorps | null) {
    // console.log(couponData);
    if (v == null || couponData.length == 0) {
      return;
    }
    const index = parseInt(v.value);
    setCouponIndex(index);
  }

  const [asOrder, setAsOrder] = useState(false);

  function setOrderInfo() {
    const name = OrderData.UserName;
    const number = OrderData.Cellphone;
    if (!asOrder) {
      setData({
        ...OrderData,
        RepresentativeName: name,
        PassengerPhoneNumber: number,
      });
      setError({
        ...errorCheck,
        RepresentativeName: true,
        PassengerPhoneNumber: true,
      });
    } else {
      setData({
        ...OrderData,
        RepresentativeName: "",
        PassengerPhoneNumber: "",
      });
      setError({
        ...errorCheck,
        RepresentativeName: false,
        PassengerPhoneNumber: false,
      });
    }
    setAsOrder(!asOrder);
  }

  function submit() {
    // console.log(OrderData);
    if (!errorListCheck(Object.values(errorCheck))) {
      setAlert({
        alertText: "尚有欄位未完成，請再次檢查您的預約資料。",
        open: true,
        backPage: false,
        loading: false,
      });
      return;
    }
    setAlert({
      alertText: "",
      open: true,
      backPage: false,
      loading: true,
    });
    postQuery();
  }

  const postQuery = async () => {
    const data = await sendQuery(OrderData);
    if (data["ResultCode"] == "1000") {
      if (OrderData.CouponCode == "" || OrderData.CouponName == "") {
        setAlert({
          alertText: "預約成功，客服人員將盡快與您聯絡。",
          open: true,
          backPage: true,
          loading: false,
        });
        return;
      }
      const now = DateY_M_D_hms(new Date());
      const useCouponRequest = {
        acctid: OrderData.AcctId,
        discountamount: couponData[couponIndex].discount,
        phone: OrderData.Cellphone,
        sequence_id: couponData[couponIndex].sequence_id,
        source: ServiceCode,
        totalamount: "0",
        ordertime: now,
        orderid: data["DriverDemandResponse"]["OrderNumber"],
      };
      //console.log(useCouponRequest);
      postUseCoupon(useCouponRequest);
    } else {
      setAlert({
        alertText:
          "預約不成功，請稍後再試或聯絡客服人員。(" + data["ResultCode"] + ")",
        open: true,
        backPage: false,
        loading: false,
      });
    }
  };

  const postUseCoupon = async (requrst: object) => {
    const data = await useCoupon(requrst);
    //console.log(data);
    if (data["ReturnCode"] === 0) {
      setAlert({
        alertText: "預約成功，客服人員將盡快與您聯絡。",
        open: true,
        backPage: true,
        loading: false,
      });
    } else {
      setAlert({
        alertText:
          "您的優惠券無法使用，客服人員將盡快與您聯絡。(" +
          data["ResultCode"] +
          ")",
        open: true,
        backPage: true,
        loading: false,
      });
    }
  };

  return (
    <LayoutMobile title={Service + "需求單"} bgColor={bgColor}>
      <Alert setFunc={setAlert} modalData={alert} />
      <div className="w-full pt-6 px-4 text-3xl" style={{ color: fontColor }}>
        {Service + "需求單"}
      </div>
      <div className="w-full py-2 px-4" style={{ color: fontColor }}>
        為確保服務順利使用，請填寫真實資料
      </div>
      {acctid != 0 && couponOptions.length > 0 && (
        <div>
          <div className="w-full px-4 py-2">
            <span style={{ color: fontColor }}>優惠券</span>
          </div>
          <div className="w-full px-2">
            <Select
              id="coupon"
              instanceId="coupon"
              inputId="coupon"
              name="coupon"
              className="basic-single"
              classNamePrefix="select"
              defaultValue={couponOptions[0]}
              options={couponOptions}
              isSearchable={false}
              onChange={(v) => selectCoupon(v)}
            />
          </div>
        </div>
      )}

      <div className="w-full " style={{ backgroundColor: bgColor }}>
        <div className="w-full p-4">
          <span style={{ color: fontColor }}>預約人資料</span>
          <span ref={acctidRef} id="acctid" className="hidden">
            {acctid}
          </span>
          <button
            className="hidden"
            id="flutterCall"
            onClick={() => flutterCall()}
          ></button>
        </div>
        <div className="w-full p-4 bg-white">
          <TextField
            textColor={fontColor}
            label="姓名"
            name="name"
            hint="*"
            errorText="請輸入正確的姓名"
            initData={OrderData.UserName}
            validate={nameValidate}
            onChange={(v: string) => setData({ ...OrderData, UserName: v })}
            errorCheck={(v: boolean) =>
              setError({ ...errorCheck, UserName: v })
            }
            type="text"
            maxlength={20}
          />

          <TextField
            textColor={fontColor}
            label="Email"
            name="Email"
            hint="*"
            errorText="請輸入正確的Email"
            initData={OrderData.Email}
            validate={emailValidate}
            onChange={(v: string) => setData({ ...OrderData, Email: v })}
            errorCheck={(v: boolean) => setError({ ...errorCheck, Email: v })}
            type="Email"
            maxlength={50}
          />

          <TextField
            textColor={fontColor}
            label="行動電話"
            name="phone"
            hint="*"
            errorText="請輸入正確的行動電話"
            initData={OrderData.Cellphone}
            validate={phoneValidate}
            onChange={(v: string) => setData({ ...OrderData, Cellphone: v })}
            errorCheck={(v: boolean) =>
              setError({ ...errorCheck, Cellphone: v })
            }
            type="tel"
            maxlength={13}
          />

          <TextField
            textColor={fontColor}
            label="聯絡電話"
            name="tel"
            hint=""
            errorText=""
            initData={OrderData.Telephone}
            validate={() => {}}
            onChange={(v: string) => setData({ ...OrderData, Telephone: v })}
            errorCheck={() => {}}
            type="tel"
            maxlength={20}
          />

          <TextField
            textColor={fontColor}
            label="傳真號碼"
            name="Fax"
            hint=""
            errorText=""
            initData={OrderData.Fax}
            validate={() => {}}
            onChange={(v: string) => setData({ ...OrderData, Fax: v })}
            errorCheck={() => {}}
            type="tel"
            maxlength={20}
          />
        </div>
      </div>
      <div className="w-full" style={{ backgroundColor: bgColor }}>
        <div className="w-full p-4">
          <span style={{ color: fontColor }}>乘車服務資料</span>
        </div>
        <div className="w-full p-4 bg-white">
          <DateTimeLocalPicker
            dateTitle="司機報到日期"
            dateHint="*"
            timeTitle="報到時間"
            timeHint="*"
            onPick={(v: string) =>
              setData({ ...OrderData, DriverTimeOfArrival: v })
            }
            textColor={fontColor}
          />
          <TextField
            textColor={fontColor}
            label="出發地點"
            name="DeparturePlace"
            hint="*"
            errorText="請輸入出發地點"
            initData={OrderData.DeparturePlace}
            validate={nameValidate}
            onChange={(v: string) =>
              setData({ ...OrderData, DeparturePlace: v })
            }
            errorCheck={(v: boolean) =>
              setError({ ...errorCheck, DeparturePlace: v })
            }
            type="text"
            maxlength={50}
          />

          <TextField
            textColor={fontColor}
            label="到達地點"
            name="ArrivalPlace"
            hint="*"
            errorText="請輸入到達地點"
            initData={OrderData.ArrivalPlace}
            validate={nameValidate}
            onChange={(v: string) => setData({ ...OrderData, ArrivalPlace: v })}
            errorCheck={(v: boolean) =>
              setError({ ...errorCheck, ArrivalPlace: v })
            }
            type="text"
            maxlength={50}
          />
          <TextField
            textColor={fontColor}
            label="行程概要"
            name="TripDescription"
            hint=""
            errorText=""
            initData={OrderData.TripDescription}
            validate={() => {}}
            onChange={(v: string) =>
              setData({ ...OrderData, TripDescription: v })
            }
            errorCheck={() => {}}
            type="textarea"
            maxlength={255}
          />
          <TextField
            textColor={fontColor}
            label="其他留言"
            name="Message"
            hint=""
            errorText=""
            initData={OrderData.Message}
            validate={() => {}}
            onChange={(v: string) => setData({ ...OrderData, Message: v })}
            errorCheck={() => {}}
            type="textarea"
            maxlength={255}
          />
        </div>
      </div>
      <div className="w-full" style={{ backgroundColor: bgColor }}>
        <div className="w-full p-4 flex justify-between ">
          <span className="w-full" style={{ color: fontColor }}>
            乘車人資料
          </span>
          <CheckBox
            label="同預約人"
            name="asOrder"
            checked={asOrder}
            onChange={setOrderInfo}
            textColor={fontColor}
          />
        </div>
        <div className="w-full p-4 bg-white">
          <TextField
            textColor={fontColor}
            label="代表人姓名"
            name="RepresentativeName"
            hint="*"
            errorText="請輸入正確的姓名"
            initData={OrderData.RepresentativeName}
            validate={nameValidate}
            onChange={(v: string) =>
              setData({ ...OrderData, RepresentativeName: v })
            }
            errorCheck={(v: boolean) =>
              setError({ ...errorCheck, RepresentativeName: v })
            }
            type="text"
            maxlength={20}
          />

          <TextField
            textColor={fontColor}
            label="行動電話"
            name="PassengerPhoneNumber"
            hint="*"
            errorText="請輸入行動電話"
            initData={OrderData.PassengerPhoneNumber}
            validate={phoneValidate}
            onChange={(v: string) =>
              setData({ ...OrderData, PassengerPhoneNumber: v })
            }
            errorCheck={(v: boolean) =>
              setError({ ...errorCheck, PassengerPhoneNumber: v })
            }
            type="tel"
            maxlength={13}
          />
          <TextField
            textColor={fontColor}
            label="乘客人數"
            name="NumberOfPassengers"
            hint="*"
            errorText="請輸入人數"
            initData={OrderData.NumberOfPassengers}
            validate={passengerValidate}
            onChange={(v: string) =>
              setData({ ...OrderData, NumberOfPassengers: v })
            }
            errorCheck={(v: boolean) =>
              setError({ ...errorCheck, NumberOfPassengers: v })
            }
            type="number"
            maxlength={1}
          />
          <TextField
            textColor={fontColor}
            label="大行李件數"
            name="NumberOfLargeLuggage"
            hint=""
            errorText=""
            initData={OrderData.NumberOfLargeLuggage}
            validate={() => {}}
            onChange={(v: string) =>
              setData({ ...OrderData, NumberOfLargeLuggage: v })
            }
            errorCheck={() => {}}
            type="number"
            maxlength={1}
          />
          <TextField
            textColor={fontColor}
            label="中行李件數"
            name="NumberOfMiddleLuggage"
            hint=""
            errorText=""
            initData={OrderData.NumberOfMiddleLuggage}
            validate={() => {}}
            onChange={(v: string) =>
              setData({ ...OrderData, NumberOfMiddleLuggage: v })
            }
            errorCheck={() => {}}
            type="number"
            maxlength={1}
          />
        </div>
        <div className="w-full p-4 pt-4 pb-8">
          <Button onClick={submit} color={color}>
            立即預約
          </Button>
        </div>
      </div>
    </LayoutMobile>
  );
}
