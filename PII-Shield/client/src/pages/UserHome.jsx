import React, { useEffect, useState } from "react";
import "./UserHome.css";
import Card from "./Card";
import { create } from "kubo-rpc-client";

// connect to the default API address http://localhost:5001

// we will use this TextEncoder to turn strings into Uint8Arrays
const ipfs = create({ url: "/ip4/127.0.0.1/tcp/5001" });

const upload = async () => {
  // connect to a different API
  // const client = create({ url: "http://127.0.0.1:5002/api/v0" });

  // connect using a URL
  // const client = create(new URL("http://127.0.0.1:5002"));

  // call Core API methods
  const cid_temp = await ipfs.add("Sadhak Randiputram");

  // const cid = await fs.addBytes(bytes);

  return cid_temp;
};

// for await (const chunk of fs.cat(cid)) {
//   text += decoder.decode(chunk, {
//     stream: true,
//   });
// }

const download = async () => {
  var decoder = new TextDecoder("utf-8");
  let text = ''
  for await (const chunk of ipfs.cat(
    "QmVeqGzd4fctuLngqM5tv4bHETSpYbak8tazHqrc5m1WaU"
  )) {
    text += decoder.decode(chunk, { stream: true });
    console.info(text);
  }
  //   const content = await ipfs.cat(
  //     "QmcbV87RBWti2m4ijz6i6oQiefrePUJZ5XyTdh7YLmaF26"
  //   );
  //   console.log("file content is ",content)
};

function UserHome() {
  const [cid, setCid] = useState(null);

  useEffect(() => {
    const getCid = async () => {
      const cid_temp = await upload();
      setCid(cid_temp);
    };
    getCid();
    download();
  }, []);

  // add the bytes to your node and receive a unique content identifier

  console.log("Added file:", cid);
  return !cid ? <div>loading</div> : `${cid.path}`;
}

export default UserHome;
