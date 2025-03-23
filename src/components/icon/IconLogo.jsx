// import React from 'react';

const IconLogo = ({ color = "var(--red)", fill = "var(--red)", width = "82px", height = "42px" }) => (
  <svg
    className="logo"
    viewBox="0 0 82 42"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill={fill}
    color={color}
    style={{ fill: 'var(--red)' }}
  >
    <image
      width="42.333332"
      height="21.695833"
      preserveAspectRatio="none"
      xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAABSCAYAAADTld8/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjYjVlMzM1Zi03ZmJhLTk4NDctYjI3YS01ZGFjMTYxNDM0YWMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTUwNjcyQkZFMUE3MTFFRkIzMDdFNThGQTIzM0Y4NTkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTUwNjcyQkVFMUE3MTFFRkIzMDdFNThGQTIzM0Y4NTkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZTFhMTQwYmEtY2Q3OC1jNTQzLThiOTUtYmZjZTBmZTk1MjQxIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6OWM3ZGE3Y2ItZTFhNC0xMWVmLWI1ZTktZmUzM2MwZjhiNGZhIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+H1q/rAAAHJ9JREFUeNrsnQlwVdd5xy9CEtgsBozYxSoBsgEZZMdgJDCkdsCJp2m8ZOw4Hk/r2uNMWrfxdNLMdNommekybTKZJhPX6QS3TV1nSlKvAdssdhAgwAaxGLCFALFILGIRYAMGIfX/u9xPc/3y7n336d0nyfSdmTPv6eku53zn/33f//vOuef2KigocEJKnmqd6jDVVidXciV6yVdtUa1UPRh2UFh5VXVSTpa50skyQLVGtVT1fJCFCyo/Vv1iToa5kmEZpVod5mKTlW+rfjMnu1yJqcxSfT3ZP3qrJP72sOqzOZnlSsxlsuog1Tf9P/ZKCEJGqjblZJUrWSwLVN9J5oIhjCty8smVLJfVqrcnAhDw7VC9OSefXMly6aW6wbmanulwwVtVy3OyyZUuLG2qU/O96CQIfO2qr6geI2DJyezaKu3t7W6N1bz16uVWlSte0PGgZ/USC973DSxgqhaMjjMwoXFXrlxxK9/z8vLc75TCwsLYBdJj/M7VQXH7x/dLly51eZ8vX77sfuL17Hu2CvdQP/PUtythx2EBP1LtH3LMmDgAiNDb2to6Oj5p0iTn3LlzTnNzszNz5kzn1KlTzuHDh11AXovAMyUzhSsqKnIuXLjgfPTRR1kHosl8wIABLjDOnDnj3n/WrFnODTfc0KEMmZb8/Hy3D5s2bXIOHTrE3+Os/wHlXL7nZsNKxogAeDYAo0aNcmbMmOHceuutzk9+8hOnoqLC+cEPfuA888wzzoEDB/wm/JoAHn236vcAo0ePdubPn++sXbvW2bx5cwcIUszNp3X/1tZW977XXXedU1xc7EyYMMHZvn27e/8HHnjAmThxYqyWkHtdf/31zrRp05xnn33WOX78eF6q/uRncxDQBoRAGTFihGv1pk6d6tx4443Ovn37ylpaWiaMHDlymY4pOHv27Jd02EvGSz6rQKTNtD8J8Bbo98v6ey1yl7Vf3L9//9889thjbXiAXbt2OR9++KFz8uTJjCyin+JgkQAeSj948GDnk08+uaFPnz5TNA6b3n//fWfjxo13Se7f0GkXYwJgH1nW2kceeeT7N998MwBMbTWzzTcEMKesrMwVhAGqqanJefnll98FcL17914m7W+VsJfq7xU6ZjGD5gehVf+A+MEdVpjpieLWGTADSzqDjYZbW/3W3trq/T5Jf5P/ekp1rdrUeuLEif94/PHHtz766KMLx40b50yZMsU5ffq0U1NT46xZs8a1iJxL+6P00yyNWVJc7JAhQ5x+/fq5LhdXf+TIke/pel+ZPn168cGDB52jR48WCoBfjnPcRaVukby/H1V58rMFPPgGrra0tNQFgDrqChMT/eabb646f/58Px222Rt0WrtddZEaPleCX2eWkP9bsELlN7sHAuaayYDD79J4V/gAIpkr8LspytChQzu4ahS+g4Yz4Gat/CD2We9++t8G7/tO3/92yAoteOutt+bfcccdv4UL4yoXLVrkgnHDhg3O1q1b3fYhM1O6ZP2kDQa8vn37uv1ANpwrL+OOhWTWT6D/U+7NMXgjeaWtgD3OonsdSEeZ8+NyO4ACAcnEO5MnT3Zd7cCBA10AIAgGbNCgQc4bb7zxUwl7oS8paeW4Z4nellCZN2xIJPEGRoQ7duxY9zMolQDBLy8vd4H/6quvOgL8p1ybH8glJSVOZWWlGxRhnelDWKE/9IW2QLgBYoLF8xdWggz1vhd2EOu8vGb6s3LlytXDhg2bKqu0h3t//PHHLoDuv/9+t12Ah7pjxw4XoIkUh0I/t23b5jQ2Njq33Xab+zv9py3InX6tXr36RTtHijlTVrf24sWLTeprk/4e1V2UJRYAmvYBPHw/wMDkS+M63B8cZOfOnYsUaDzlx67fi9inwLZR55UQJSVG0URtCJnCYBkofye8Onf11AcffNAlxevWrXPefvttR0LvOAZeunDhQrfNgM7+n8plA0DuLdC4x69YsSIIfH+rAZ8Z5DUNi7/61a9qpBglak8L7cYVcw+U+Pbbb3fdMhbcLKEfgAANd/v00087v/zlL529e/e6QDUuiKLW1dU9IENwr50nV1wludVKKdulSOuPHTt2/2cWgFgRggpC+jFjxrgCAXh+QoxGC3gzFPEtj3jZYRLuWp1fnszlcE0G3ixAMgsIiHDBcB2Rfeehhx5y5syZ42iwXSsHiInEGVRSQBxvbiMVf7H/o2QhUeTXdNzfRFTgG1944YX1jz/++DQpWBsApC20i7YiUwCZmC4xt4+Vx9Ui9927d7sGwGhCQ0PDQAV8L/jP0/FzZPH/BRnqutXdCcC8TN0ufAIrAsjUEVcY/I6w+EQYiuxGrlq1am2aEfQM1f9NFixYEjtSBwUsgKKBcN3mE0884Tz55JOOeJfbRtocZEWjWH5oRhJ+uVBt/680FblMQckrtBeZAi6+R2mXHUtaBWNAP/kk8FP//kfX/lQDBfAq7sH4qK7vzqxBpwFo1oKBJL9Eh3BpVslzEf4fPny4bPny5ZsFmgGdSOP8gep3/b/B4ZKsYYwERPgorpNBhfQzAJkmvpO05ffV5lWduZas3ZeWLl36d1hlmy2xwCtVwUIS8cIXaRNuub6+/i5Zxi8koSejN27cWO4l/reIfjTGmYlKJ33UaRdMh7FuVVVVrgUAGP6CZZAABohko2GDMsgl/rUG44IE9Q+A3iwO7iMMjLhf+CJtNJBZNI2VTozSLIBCkRK5VjLa"
      id="image1-4"
      x="45.60236"
      y="1.8373413e-08"
      style={{ fill: '#000000', fillOpacity: 1, stroke: 'none', strokeOpacity: 1 }}
      color={color}
    />
    <text
      xmlSpace="preserve"
      style={{
        fontSize: '18.2395px',
        textAlign: 'start',
        writingMode: 'lr-tb',
        direction: 'ltr',
        textAnchor: 'start',
        display: 'inline',
        fill: '#000000',
        fillOpacity: 1,
        stroke: 'none',
        strokeWidth: '0.213743px',
        strokeOpacity: 1,
      }}
      x="-0.49930432"
      y="16.058361"
      id="text2"
      transform="scale(0.80784788,1.2378568)"
      color={color}
    >
      <tspan
        sodipodi:role="line"
        id="tspan2"
        style={{ fill: 'var(--red)', fillOpacity: 1, stroke: 'none', strokeWidth: '0.213743px', strokeOpacity: 1 }}
        x="-0.49930432"
        y="16.058361"
        color={color}
      >
        LOGO
      </tspan>
    </text>
  </svg>
);

export default IconLogo;