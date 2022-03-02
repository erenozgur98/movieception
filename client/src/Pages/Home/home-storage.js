{/* <header
    className='header-banner'
    style={{
        backgroundSize: 'cover',
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
        backgroundPosition: '50% 10%',
        // opacity: '0.521'
        // backgroundPosition: 'center center'
    }}
>
    <div className='header-banner-button-container'>
        {movie?.title &&
            <h2 className="header-banner-title">
                Image from: {movie?.title}
            </h2>
        }
    </div>
    {movie &&
        <div className='header-banner-button-container'>
            <button className='header-banner-btn' onClick={redirect}>Go To {movie?.title || movie?.name}</button>
        </div>
    }
</header> */}

// storage for home page up is js, down is css


// .header-banner {
//     /* object-fit: contain; */
//     /* original 448px */
//     height: 688px;
//     /* height: 548px; */
//   }
  
//   .header-banner-title {
//     position: relative;
//     text-align: end;
//     top: 36.8rem;
//     padding-right: 12px;
//     font-size: 0.9rem;
//     font-style: italic;
//     color: rgb(133, 132, 132);
//   }
  
//   .header-banner-real-title {
//     position: absolute;
//     top: 24.5rem;
//     /* top: 24.5rem; */
//     margin-left: 2rem;
//   }
  
//   .header-banner-btn {
//     position: absolute;
//     top: 36rem;
//     /* top: 28rem; */
//     margin-left: 2rem;
//     border-radius: 20vw;
//     background-color: rgba(51, 51, 51, 0.5);
//     padding: 0.5rem 1rem;
//   }
  
//   .header-banner-btn:hover {
//     color: #000;
//     background-color: #e6e6e6;
//     transition: all 0.2s;
//   }
  
//   .header-banner--fadeBottom {
//     /* margin-top: 414px; */
//     /* height: 16.1rem; */
//     /* height: 7.4rem; */
//     /* background-image: linear-gradient(
//       180deg,
//       transparent,
//       rgba(37, 37, 37, 0.61),
//       #111
//   ); */
//   }

// @media screen and (max-width: 988px) {
//     .header-banner-button-container {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//     }
  
//     .header-banner-btn {
//       margin-left: 0;
//     }
  
//     .header-banner-title {
//       top: 40rem;
//     }
//   }