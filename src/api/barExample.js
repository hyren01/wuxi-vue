export default {
  "tooltip": {
    "show": true
  },
  "title": {
    "show": true,
    "textStyle": {
      "color": "rgba(0, 0, 0 , .87)",
      "fontFamily": "sans-serif"
    }
  },
  "grid": {
    "containLabel": true,
    "left": "2%",
    "bottom": "5%",
    "right": "3%"
  },
  "xAxis": {
    "show": true,
    "type": "category",
    "axisLine": {
      "lineStyle": {
        "color": "rgba(0, 0, 0 , .54)",
        "type": "dashed"
      }
    },
    "axisTick": {
      "show": true,
      "alignWithLabel": true,
      "lineStyle": {
        "show": true,
        "color": "rgba(0, 0, 0 , .54)",
        "type": "dashed"
      }
    },
    "axisLabel": {
      "show": true
    }
  },
  "yAxis": {
    "show": true,
    "type": "value",
    "axisLine": {
      "lineStyle": {
        "color": "rgba(0, 0, 0 , .54)",
        "type": "dashed"
      }
    },
    "axisLabel": {
      "show": true
    },
    "splitLine": {
      "lineStyle": {
        "type": "dashed"
      }
    },
    "axisTick": {
      "show": true,
      "lineStyle": {
        "show": true,
        "color": "rgba(0, 0, 0 , .54)",
        "type": "dashed"
      }
    }
  },
  "series": [
    // {
    //   "type": "bar",
    //   "areaStyle": {},
    //   "smooth": true
    // },
    {
      "smooth": true,
      "type": "bar",
      "areaStyle": {}
    }
  ],
  "dataset": {
    "source": [
      {
        "month": "Jan",
        "Unique Visit": 318,
        "Page View": 345
      },
      {
        "month": "Feb",
        "Unique Visit": 946,
        "Page View": 345
      },
      {
        "month": "Mar",
        "Unique Visit": 200,
        "Page View": 562
      },
      {
        "month": "Apr",
        "Unique Visit": 500,
        "Page View": 562
      },
      {
        "month": "May",
        "Unique Visit": 780,
        "Page View": 562
      },
    ]
  },
  "color": [
    "#66bb6a",
    "#03a9f4",
    
  ],
  "legend": {
    "show": true
  }
}