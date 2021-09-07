import styled from 'styled-components'

export const SliderContainer = styled.div<any>`
  position: relative;
  height: 100%;

  .swiper-container {
    height: 100%;
    padding-bottom: 30px;
  }

  .swiper-pagination {
    bottom: 0px;
  }

  .swiper-pagination-bullet {
    background: #adabab;
    margin: 0 8px;
  }

  .swiper-pagination-bullet-active {
    background: #ffffff;
  }

  img {
    border-radius: 9px;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .bottom-container {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    height: 50px;
    align-items: center;
    justify-content: center;
    background-color: rgba(62, 33, 87, 0.48);
    border-bottom-left-radius: 9px;
    border-bottom-right-radius: 9px;
  }
  @media only screen and (max-width: 720px) {
    .bottom-container {
      height: 30px;
    }
  }
`
export const OuterContainer = styled.div<any>`
  position: relative;
  padding-top: calc(56.17% + 30px);
  width: 100%;

  .inner-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`
