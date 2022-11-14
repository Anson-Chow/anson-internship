import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {

  const { itemId } = useParams()
  const [loading, setLoading] = useState()
  const [itemDetails, setItemDetails] = useState()

  
  async function getItemDetails(){
    const { data } = await axios.get(
      ` https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${itemId}`
    )
    console.log(data)
    setItemDetails(data)
    setLoading(false)
  }
  
  useEffect(() => {
    window.scrollTo(0, 0);
    getItemDetails();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        {loading === false ? (
          <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={itemDetails.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{itemDetails.title} #{itemDetails.tag}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {itemDetails.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {itemDetails.likes}
                    </div>
                  </div>
                  <p>
                   {itemDetails.description}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${itemDetails.ownerId}`}>
                            <img className="lazy" src={itemDetails.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${itemDetails.ownerId}`}>{itemDetails.ownerName} </Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${itemDetails.creatorId}`}>
                            <img className="lazy" src={itemDetails.creatorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${itemDetails.creatorId}`}>{itemDetails.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{itemDetails.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        ):(
          <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <Skeleton width={"100%"} height={600}/>
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2><Skeleton width={220} height={40}/></h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <Skeleton width={40} height={20}/>
                    </div>
                    <div className="item_info_like">
                      <Skeleton width={40} height={20}/>
                    </div>
                  </div>
                  <p>
                  <Skeleton width={"100%"} height={80}/>
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Skeleton width={50} height={50} borderRadius={999}/>
                        </div>
                        <div className="author_list_info">
                          <Skeleton width={100} height={25}/>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                        <Skeleton width={50} height={50} borderRadius={999}/>
                        </div>
                        <div className="author_list_info">
                          <Skeleton width={100} height={25}/>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      
                      <Skeleton width={100} height={30}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        )}
      </div>
    </div>
  );
};

export default ItemDetails;
