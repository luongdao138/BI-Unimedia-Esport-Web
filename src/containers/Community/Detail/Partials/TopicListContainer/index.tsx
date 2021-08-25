import { Box, useMediaQuery, useTheme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import TopicRowItem from '@components/TopicRowItem'
import Pagination from '@material-ui/lab/Pagination'
import { Colors } from '@theme/colors'
import { useState, useEffect } from 'react'
import PaginationMobile from '../../../Partials/PaginationMobile'

const InfoContainer: React.FC = () => {
  const dummy_data = [
    {
      title: '自己紹介しよう！ 自己紹介しよう！自己紹介しよう！自己紹介しよう！自己紹介しよう！自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜 はじめまして！　ダミーテキストです〜はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 901,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 902,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 903,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 904,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 905,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 906,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 907,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 908,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 909,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 910,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 911,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 912,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 913,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 914,
    },
    {
      title: '自己紹介しよう！ 自己紹介しよう！自己紹介しよう！自己紹介しよう！自己紹介しよう！自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜 はじめまして！　ダミーテキストです〜はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 901,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 902,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 903,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 904,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 905,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 906,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 907,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 908,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 909,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 910,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 911,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 912,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 913,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 914,
    },
    {
      title: '自己紹介しよう！ 自己紹介しよう！自己紹介しよう！自己紹介しよう！自己紹介しよう！自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜 はじめまして！　ダミーテキストです〜はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 901,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 902,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 903,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 904,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 905,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 906,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 907,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 908,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 909,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 910,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 911,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 912,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 913,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 914,
    },
    {
      title: '自己紹介しよう！ 自己紹介しよう！自己紹介しよう！自己紹介しよう！自己紹介しよう！自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜 はじめまして！　ダミーテキストです〜はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 901,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 902,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 903,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 904,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 905,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 906,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 907,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 908,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 909,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 910,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 911,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 912,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 913,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 914,
    },
    {
      title: '自己紹介しよう！ 自己紹介しよう！自己紹介しよう！自己紹介しよう！自己紹介しよう！自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜 はじめまして！　ダミーテキストです〜はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 901,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 902,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 903,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 904,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 905,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 906,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 907,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 908,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 909,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 910,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 911,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 912,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 913,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 914,
    },
    {
      title: '自己紹介しよう！ 自己紹介しよう！自己紹介しよう！自己紹介しよう！自己紹介しよう！自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜 はじめまして！　ダミーテキストです〜はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 901,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 902,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 903,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 904,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 905,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 906,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 907,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 908,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 909,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 910,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 911,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 912,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 913,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 914,
    },
    {
      title: '自己紹介しよう！ 自己紹介しよう！自己紹介しよう！自己紹介しよう！自己紹介しよう！自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜 はじめまして！　ダミーテキストです〜はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 901,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 902,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 903,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 904,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 905,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 906,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 907,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 908,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 909,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 910,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 911,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 912,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 913,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 914,
    },
    {
      title: '自己紹介しよう！ 自己紹介しよう！自己紹介しよう！自己紹介しよう！自己紹介しよう！自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜 はじめまして！　ダミーテキストです〜はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 901,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 902,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 903,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 904,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 905,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 906,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 907,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 908,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 909,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 910,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 911,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 912,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 913,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 914,
    },
  ]

  const _theme = useTheme()
  const isMobile = useMediaQuery(_theme.breakpoints.down('sm'))

  const [page, setPage] = useState(1)
  const [count, setCount] = useState(1)
  const chunkSize = 10
  const classes = useStyles()

  useEffect(() => {
    setCount(Math.ceil(dummy_data.length / 10))
  }, [])

  const handleChange = (event, value) => {
    setPage(value)
    return event
  }

  const chunks = (arr, index) => {
    const chunk_array = []
    for (let i = 0; i < arr.length; i += chunkSize) chunk_array.push(arr.slice(i, i + chunkSize))
    return chunk_array[index - 1]
  }

  return (
    <>
      <Box mt={2} />

      {chunks(dummy_data, page).map((d, i) => {
        return (
          <TopicRowItem key={i} title={d.title} last_comment={d.last_comment} latest_date={d.latest_date} comment_count={d.comment_count} />
        )
      })}
      <Box display="flex" justifyContent="center" mt={4}>
        {isMobile ? (
          <PaginationMobile page={page} pageNumber={count} setPage={setPage} count={count} />
        ) : (
          <Pagination
            className={classes.pagination}
            count={count}
            page={page}
            onChange={handleChange}
            variant="outlined"
            shape="rounded"
            color="primary"
            hideNextButton
            hidePrevButton
            showFirstButton
            showLastButton
          />
        )}
      </Box>
    </>
  )
}
const useStyles = makeStyles(() => ({
  pagination: {
    zIndex: 1,
    '& .MuiPaginationItem-root': {
      color: Colors.white,
      borderRadius: 4,
    },
    '& .MuiPaginationItem-outlined': {
      borderColor: Colors.primary,
    },
    '& .Mui-selected': {
      backgroundColor: Colors.primary,
      color: Colors.white,
    },
    '& .MuiPaginationItem-ellipsis': {
      height: 32,
      border: '1px solid',
      borderColor: Colors.primary,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
}))
export default InfoContainer
