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
    "containLabel": true
  },
  "xAxis": {
    "show": false,
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
      "show": false
    }
  },
  "yAxis": {
    "show": false,
    "type": "value",
    "axisLine": {
      "lineStyle": {
        "color": "rgba(0, 0, 0 , .54)",
        "type": "dashed"
      }
    },
    "axisLabel": {
      "show": false
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
    {
      "type": "pie",
      "avoidLabelOverlap": true,
      "radius": [
        "50%",
        "70%"
      ]
    }
  ],
  "dataset": {
    "source": [
      // {
      //   "value": 50,
      //   "name": "China"
      // },
      // {
      //   "value": 35,
      //   "name": "USA"
      // }
    ]
  },
  "legend": {
    "bottom": "0"
  },
  "color": [
    "#e91e63",
    "#03a9f4",
    "#3f51b5",
    
    "#4caf50",
    "#00bcd4",
    "#009688"
  ]
}