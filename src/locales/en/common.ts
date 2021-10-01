export default {
  common: {
    birthday: '生年月日',
    year: '年',
    month: '月',
    day: '日',
    time: '時間',
    hour: '時',
    gender: '性別',
    male: '男性',
    female: '女性',
    other: 'その他',
    required: '必須',
    input_required: '入力必須項目です',
    private: '非公開',
    zero: '0',
    see_more: 'もっと見る',
    at: '@',
    search_results: '検索結果',
    total: '件',
    error: 'エラー文言が入ります',
    game_display_name_error: '入力必須項目です',
    too_long: '{{max}}文字以内で入力してください',
    at_least: '2文字以上入力してください。',
    at_least_8: '8文字以上で入力してください',
    contains_ngword: '不適切な文字列が含まれています。',
    user_code_invalid: 'ユーザーIDには（英数字、_、-）のみ入力可能です',
    not_selected: '選択されていません',
    save: '保存する',
    dont_save: '保存しない',
    cancel: 'キャンセル',
    done: '完了',
    change: '変更する',
    user_id: 'ユーザーID',
    mail_address: 'メールアドレス',
    password: 'パスワード',
    next: '次へ',
    yes: 'あり',
    no: 'なし',
    man: '人',
    integer: '数字のみ入力してください。',
    unregistered: '未登録',
    validation: {
      acceptance_dates: 'エントリー終了日時はエントリー開始日時より後ろでなければなりません',
      acceptance_end_start_date: 'エントリー終了日時は開催日時より前でなければなりません',
      start_end_date: '開催終了日時は開催日時より後ろでなければなりません',
      min_date: '日時は現在の日時より後でなければなりません',
      prize_non_cash: '※現金等を副賞とするのはご遠慮ください。',
      char_limit: '{{char_limit}}文字以内で入力してください。',
      only_single_byte: '半角英数以外が入力されています',
      only_digit: '半角数字以外が入力されています',
      before_entry_end_date: 'エントリー開始日時はエントリー終了日時より前にしてください',
      before_start_date: 'エントリー終了日時は開催日時より前にしてください',
    },
    no_data: '対象データありません',
    failed_to_get_data: 'データの取得に失敗しました。',
    input_is_incorrect: '入力内容が適切ではありません。',
    dash: '-',
    dash_separator: 'ー',
    team: 'チーム',
    send: '送信する',
    select_an_image: '画像を選択',
    not_sure: '未確定',
    please_set: '設定してください',
    password_duplicated: 'パスワード再設定できませんでした。',
    confirmation_expire: '認証できませんでした。',
    sns_reset_password_error: 'パスワードの再設定出来ませんでした。',
    user_id_at_least: 'ユーザIDは二文字以上としてください',
    nickname_at_least: 'ニックネームは二文字以上としてください',
    info: `アカウントの削除はお問い合わせフォームから承ります。
    件名に「アカウント削除」と記入し、本文に理由を添えて送信をお願いします。`,
    confirm_title: '注文をキャンセルします',
    confirm_back: '戻る',
    confirm_ok: 'キャンセルする',
    blocking: 'ブロック中',
    username: 'ユーザー名',
    loading: '読み込み中...',
    no_user_available: '一致するデータが見つかりません',
    made: 'まで',
  },
  confirm_member: {
    confirm: 'メンバーの確定',
    shuffle: 'ランダムに選ぶ',
    title: 'エントリーメンバー',
    sub_title: 'メンバーを確定する',
    total_participants: '現在',
    from: '人',
  },
  pr: {
    static_title: '動画配信サービス',
  },
  page404: {
    title: '404',
    description: 'お探しのページが見つかりませんでした',
    buttonText: 'TOPへ',
  },
  welcome: 'eXeLABへようこそ',
  messages: {
    discord_id_copied: 'Discordタグをクリップボードにコピーしました。',
    profile_updated: 'プロフィールを更新しました',
    image_update: 'ツマミを操作することで、画像のリサイズを行えます。\nまた、ドラッグで位置を調整させることができます。',
    game_updated: '好きなゲームを更新しました',
    report_sent: '通報処理が完了しました',
    file_size_limit: '5MB以内の画像ファイルをアップロードしてください',
  },
  top: {
    title: '”ゲーム”が広がる。仲間ができる。',
    start_exelab: 'eXeLABをはじめる',
    is: 'は',
    top_title: `すべてのゲーマーとそのファンのための
コミュニケーションサービスです。`,
    top_description: `カジュアルに仲間を募集する、コミュニティに参加する、大会で腕試しなど、自身のスタイルに合わせた使い方が可能です。
今後も拡張されていく様々な機能を通して、ゲーマー同士やファンとの交流を広げていきます。`,
    download_app_version: 'アプリ版のダウンロードはこちら',
    recruiting_tournament: '募集中の大会',
    no_recruiting_tournament: '現在予定されている大会はありません',
    footer_download_app: 'アプリ版eXeLAB',
    footer_twitter_official: 'eXeLAB公式Twitter',
  },
  button: {
    twitter: 'Twitterでログイン',
    google: 'Googleでログイン',
    line: 'LINEでログイン',
    facebook: 'Facebookでログイン',
    apple: 'Appleでログイン',
    use: '適用',
  },
  login: {
    email_placeholder: 'sample@exelab.jp',
    email_label_primary: 'メールアドレス',
    email_label_secondary: 'メールアドレスがわからない場合',
    password_label_primary: 'パスワード',
    password_label_secondary: 'パスワードをお忘れの場合',
    submit: 'ログイン',
    register: 'はじめての方はこちら',
    divider: 'または',
    validation: {
      email: 'メールアドレスが間違っています。',
      password: 'パスワードが間違っています。',
    },
    error: {
      title: 'ログインできませんでした。',
      detail: `以下の可能性がございます。
      1、メールアドレスに誤りがある
      2、パスワードに誤りがある
      3、SNS連携でアカウントを作成している
      `,
      hint:
        '上記以外でログインできない場合は、アカウントがロックされている可能性がございます。パスワード再設定いただくか、しばらくたってからもう一度ログインしてください。',
      title2: 'ログインに失敗しました',
    },
    cannot_login: 'ログインできない方',
  },
  register: {
    button: 'メールアドレスで登録',
    description1: 'および',
    link1: '利用規約',
    link2: '個人情報保護方針',
    description2: 'に同意の上、',
    description3: '登録へ進むボタンを押してください。',
    terms: '利用規約に同意する',
    privacy: '個人情報保護方針に同意する',
    footer_link: 'アカウントをお持ちの方',
    error: {
      title: '登録に失敗しました',
      title2: '新規登録に失敗しました',
      detail2: `以下の可能性がございます。
      １. メールアドレスに誤りがある(ダミー)
      ２. パスワードに誤りがある(ダミー)
      ３. SNS連携ですでにアカウントを作成している(ダミー)`,
      hint2: '他にも文言がいるならこの色で。他にも文言がいるならこの色で。他にも文言がいるならこの色で。他にも文言がいるならこの色で。',
    },
    resend_success: '認証コードメール再度送信しました。',
  },
  register_by_email: {
    email: 'メールアドレス',
    forgot_password: 'パスワードをお忘れの場合',
    email_placeholder: 'sample@exelab.jp',
    password: 'パスワード',
    hint: '8文字以上の半角英数字を入力してください',
    hint2: 'パスワードは英大文字、英小文字、数字を一文字以上使用してください',
    hint3: '前回と同じパスワードは利用できません',
    button: '次へ',
    back: 'メールアドレスで登録',
    sns: 'SNS連携で登録',
    duplicated: 'そのIDは既に使用されています',
    enter_password_again: '新しいパスワードを再度入力してください',
  },
  register_profile: {
    user_id: 'ユーザーID',
    nickname: 'ニックネーム',
    hint: 'ユーザーIDは後から変更できません',
    hint2: '半角英数字+"_"+"-"を使用できます',
  },
  error: {
    login_failed: 'ログインに失敗しました。',
    code_invalid: '入力されたコードは無効です',
    user_settings_failed: 'User settings failed',
    signup_failed: '登録に失敗しました。',
    failed: '失敗しました',
    close_arena_failed: 'エントリーを締め切れませんでした。',
    join_arena_failed: 'エントリーを完了できませんでした。',
    edit_entry_failed: 'エントリー情報を編集できませんでした。',
    leave_arena_failed: 'エントリーを辞退できませんでした',
    too_short: '短すぎます。',
    password_must_match: 'パスワードが一致していません。',
    error_4221: '現在のパスワードが間違っています。',
    email_invalid: '有効なメールアドレスを入力してください',
    same_email: '現在のメールアドレスと同一のメールアドレスです！違うメールアドレスを入力してください。',
    error_email_4221: '有効なメールアドレスを入力してください！',
    error_email_4222: '有効なメールアドレスを入力してください！',
    password_failed: 'パスワードポリシーを満たしていません。',
    invalid_date: '適切な日付を入力してください。',
    invalid_confirmation: '認証できませんでした。',
  },
  home: {
    exelab: 'eXe LAB事務局',
    exelab_staff: '@exelab_staff',
    home: 'ホーム',
    follow: 'フォローする',
    unfollow: 'フォロー中',
    tournament: 'アリーナ',
    lobby: 'ロビー',
    community: 'コミュニティ',
    video: '動画',
    settings: '設定',
    recommended_recruitment: 'おすすめの募集',
    recommended_event: 'おすすめイベント',
    recruitment_follow: 'フォローしている人の募集',
    topic_follow: 'フォローしている人の書き込みトピック',
    change_order: '並び順を変更する',
    recommended_user: 'おすすめユーザー',
    terms_of_use: '利用規約',
    handling_of_personal_information: '個人情報の取り扱いについて',
    notation_commercial: '特定商取引に関する表記',
    help_center: 'ヘルプセンター',
    contact_us: 'お問い合わせ',
    copyright_symbol: '© ',
    copyright_text: ' NTTe-Sports',
    download_app_version: 'アプリ版ダウンロードはこちら',
    app_version: 'アプリ版eXeLAB',
    app_desc: '以下のボタンから「アプリ版eXeLAB」をインストールすることができます。',
  },
  community: {
    report: '通報',
    reported_community: 'コミュニティを通報しました',
    community_id: 'コミュニティID：',
    copy_shared_url: '共有URLをコピー',
    community_results: 'コミュニティ「:key」 の検索結果',
    community_results_all: 'コミュニティの検索結果',
    copy_shared_url_toast: 'クリップボードにコピーしました',
    toast_follow: 'このコミュニティに参加しました',
    toast_unfollowed: 'フォローを解除しました',
    toast_follow_manual_approval: 'フォローを申請しました',
    toast_cancel_follow_request: 'フォロー申請を取り消しました',
    info: 'INFO',
    topic_list: 'トピック一覧',
    search: '検索',
    area: 'エリア',
    disclosure_range: '公開範囲',
    approval_method: '承認方法',
    caretaker: '管理人',
    deputy_caretaker: '副管理人',
    official: '公式コミュニティ',
    detail_search: {
      by_title: 'タイトルのみで検索をかける',
      placeholder: 'キーワードからトピックを検索します',
      result: '検索結果',
      no_data: '該当するトピックは見つかりませんでした。',
    },
    follow_list: 'フォローリスト',
    member_list: {
      approve: '許可',
      cancel: '却下',
      hold: '保留',
      user: '一般ユーザー',
      co_organizer: '共同管理者',
      kick: 'キックする',
    },
    change_applying_members_toast: '更新しました。',
    edit: '編集',
    unapproved_users_title: '未承認ユーザーがいます',
    general_user: '一般ユーザー',
    applying: '申請中',
    participating: '参加中',
    topic_creation: 'トピック作成',
    confirm_follow_list: '更新する',
    no_data: '該当のコミュニティはありません',
    no_data_topics: '該当のトピックは存在しません',
    topic: {
      delete_success: 'トピックを削除しました。',
      view_past_comments: '↑過去のコメントを表示する',
    },
    unfollow_dialog: {
      title: 'フォローを解除する',
      description: '再フォローには再度フォロー申請が必要となりますが、よろしいでしょうか？',
      submit_title: 'フォロー解除',
    },
    unfollow_dialog_applying: {
      title: 'フォロー申請を取り消す',
      description: 'フォロー申請を取り消します。よろしいですか？',
      submit_title: '申請取消',
    },
  },
  infinite_scroll: {
    message: 'あなたはそれをすべて見ました',
  },
  followers: {
    title: 'フォロワー',
    th: '人',
  },
  following: {
    title: 'フォロー中',
    th: '人',
  },
  user_report: {
    title: '通報する',
    desc_first: '通報いただいた内容は全て運営が確認をいたしますが、',
    desc_second: 'その際の対応及び返信を行わない場合がある旨、予めご了承ください',
    desc_third: '及び返信を行わない場合がある旨、予めご了承ください',
    user_info_title: '通報する内容',
    reason: '通報理由',
    reason_desc: '詳細・補足',
    reason_desc_placeholder: `通報する理由の詳細や補足をご記入ください。
また、上記で「その他」を選んだ方はその内容をご記入ください。`,
    require: '※入力必須項目です',
    email: 'メールアドレス',
    reporter_email: 'メールアドレスの確認',
    reporter_email_placeholder: 'メールアドレスを入力してください。',
    reporter_email_confirm: '※通報にはメールアドレスの登録が必要となります。',
    email_required_text: '通報にはメールアドレスの登録が必要です',
    btn_text: '通報する',
    report_menu: '通報',
    title_chat: 'Chat',
    user_report_done: 'User Reported',
    reported: 'Reported!',
  },
  profile: {
    prefectures: '都道府県',
    location: '所在地',
    show_prefectures: '都道府県を公開する',
    show: '公開する',
    dont_show: '公開しない',
    gender: '性別',
    birth_date: '生年月日',
    show_gender: '性別を公開する',
    show_birthdate: '生年月日を公開する',
    basic_info: '基本データ',
    tag: 'タグ',
    favorite_game: {
      add_button: '追加する',
      title: '好きなゲーム',
      title_label: 'ゲーム名',
      search_title: 'キーワードで探す',
      search_by_keyword: 'キーワードで探す',
      search_by_genre: 'ジャンルから探す',
      create_new: '新しく作る',
      genre: 'ジャンル：',
      genre_label: 'ゲームジャンル',
      add_success: 'ゲームを新しく追加しました',
      no_result: '一致するゲームは見つかりませんでした',
    },
    edit: '編集',
    edit_profile: 'プロフィールを編集する',
    update_image: '画像の編集',
    reset: '画像をリセットする',
    read_more: 'もっとみる',
    collapse: '閉じる',
    follow_as: 'フォローする',
    unblock: 'ブロック解除',
    inbox: 'inbox',
    menu_block: 'ブロック',
    menu_unblock: 'ブロックを解除する',
    menu_report: '通報',
    block_success_message: 'ユーザーをブロックしました',
    following: 'フォロー中',
    followers: 'フォロワー',
    no_game_selected: '好きなゲームが選択されていません',
    no_tag_selected: 'タグ選択されていません',
    no_tag_available: 'No tag available',
    no_communities: 'おすすめコミュニティは存在しません',
    discord_placeholder: 'ユーザー名#0000を入力してください',
    block_confirm_title: '該当ユーザのブロックを解除しても良いですか。',
    block_confirm_yes: 'はい',
    block_confirm_no: 'いいえ',
    nickname: 'ニックネーム',
    bio_section: '自己紹介',
    facebook: 'FacebookURL',
    twitter: 'TwitterURL',
    twitch: 'TwitchURL',
    instagram: 'InstagramURL',
    discord: 'DiscordTag',
  },
  gender: {
    male: '男性',
    female: '女性',
    other: 'その他',
  },
  date: {
    year: '年',
    month: '月',
    day: '日',
  },
  skip: 'スキップする',
  next: '次へ',
  done: '完了',
  search_by_keyword: 'キーワードから探す',
  please_select: '選択してください',
  user: {
    user_results: 'ニックネーム・ID「:key」 の検索結果',
    user_results_all: 'ニックネーム・IDの検索結果',
  },
  tournament: {
    card_date: '開　催　日',
    acceptance_start_date: '開 催 日 時',
    organizer: '主催者',
    entry: 'エントリー',
    entry_number: 'エントリー人数',
    rule: {
      single: 'トーナメント',
      battle_royale: 'バトルロイヤル',
    },
    t_public: '公開する',
    t_private: '公開しない',
    has_prize_true: '副賞あり',
    online: 'オンライン',
    offline: 'オフライン',
    entry_back: 'エントリーメンバー',
    participant: {
      back: '参加メンバー',
    },
    tournament_id: '大会ID：',
    rule_format: '大会形式',
    prize: '副賞',
    entry_period: 'エントリー期間',
    holding_period: '開催期間',
    venue: '開催場所',
    retain_history: '戦績保存',
    participant_type: '参加形式',
    participation_condition: '参加条件',
    admin_organizer: '開催者',
    co_organizer: '共同管理者',
    organizer_name: '主催',
    game: 'ゲーム',
    game_hardware: 'ゲームハード',
    copy_url: '大会URLのコピー',
    copy_shared_url: '共有URLをコピー',
    cover_upload_select_img: '画像を選択する',
    report: '通報',
    entry_members: 'エントリーメンバー',
    number_of_entries: 'エントリー数',
    number_of_participants: '参加数',
    type_single: '個人戦',
    rule_tournament: 'トーナメント',
    rule_battle: 'バトルロイヤル',
    tournament_results: '大会「:key」 の検索結果',
    tournament_results_all: '大会の検索結果',
    follower_entering: 'フォローしている人がエントリーしている大会',
    follower_ended: 'フォローしている人がエントリーしていた大会結果',
    recruiting_tournament_list: '募集中の大会一覧',
    select_user: 'ユーザを選ぶ',
    select_team: 'チームを選ぶ',
    set_participants: '設定する',
    deselect: '選択解除',
    match_setting: '試合設定',
    vs: 'VS',
    match_result: '対戦結果',
    edit_match_result: '対戦結果を編集する',
    close_recruitment: {
      button_text: 'エントリーを締め切る',
      description: 'エントリー期間終了時、自動的にエントリーが締め切られます',
      dialog_title: '現在の人数でメンバーを確定しますか？',
      dialog_description: 'エントリー人数と参加枠数の設定に差がある場合、自動的にトーナメントの枠数の最適化を行います',
      confirm: '締め切る',
      warning: 'エントリーの再開はできません',
    },
    join: 'エントリーする',
    unjoin: 'エントリーを確認',
    before_entry: 'エントリー受付前',
    decline_entry: 'エントリーを辞退する',
    update_entry_info: 'エントリー情報の更新',
    check_entry: 'エントリーを確認する',
    tournament_detail: '大会詳細',
    unjoin_dialog: {
      dialog_title: 'エントリーを辞退しますか？',
      dialog_description: '再度エントリーすることができます。',
      decline: '辞退する',
    },
    join_with_this: 'この内容でエントリーする',
    join_nickname: 'エントリーネーム',
    join_nickname_setting: 'エントリーネームの設定',
    join_nickname_setting_desc: '次の画面でエントリーネームを変更できます',
    participants: '参加メンバー',
    group_chat: 'グループチャット',
    brackets: '対戦表',
    select_br_participants: '参加メンバー選択',
    until_deadline: '締め切りまであと',
    until_start_recruit: '受付開始まであと',
    until_event: '開催まであと',
    start_from_minutes: '分から開始',
    end_from_minutes: '分に受付終了',
    recruit_start_from_minutes: '分から受付開始',
    current_round: '{{round_number}}回戦目 対戦中',
    confirm_brackets: '大会開始前に対戦表を確定してください',
    confirm_participants: '大会開始前に参加メンバーを確定してください',
    confirm_brackets_desc_tail: 'が確定していない場合はエントリーが無効となるのでご注意ください',
    results: '大会結果',
    summary: '大会の総括',
    no_data: {
      followers_entering: '該当の大会は存在しません',
      followers_entering_results: '該当の大会結果は存在しません',
    },
  },
  arena: {
    input_result: '結果の入力',
    br_set_score_btn: '結果を反映する',
    br_set_score_success_toast: '結果を反映しました',
    listHeaders: {
      player: 'プレイヤー',
      place: '順位',
      score: 'スコア',
      time: 'タイム',
    },
    rules: {
      rule: '{{rule, arena_rule}}',
      single: 'トーナメント',
      battle_royale: 'バトルロイヤル',
      battle_royale_rule: '{{rule, battle_royale_rule}}',
      score_attack: 'スコアアタック',
      time_attack: 'タイムアタック',
    },
    status: {
      status: '{{status, status_rule}}',
      ready: '受付前',
      recruiting: '受付中',
      recruitment_closed: '開催前',
      ready_to_start: '開催前',
      in_progress: '開催中',
      completed: '大会終了',
    },
    not_entered: '未入力',
    match_not_yet: 'まだ作成されていません',
    third_place: '（3位決定戦あり）',
    no_third_place: '（3位決定戦なし）',
    randomize_button: 'ランダムに配置する',
    freeze_button: 'トーナメント表を確定する',
    freeze_br_button: '対戦表を確定する',
    randomize_success: 'ユーザーをランダムに配置しました',
    freeze_success: 'トーナメント表が確定しました',
    br_freeze_success: 'メンバーを確定しました',
    join_success: ' エントリー完了しました',
    leave_success: 'エントリーを辞退しました',
    close_entry_success: 'エントリーを締め切りました。',
    edit_entry_success: 'エントリー情報を編集しました',
    failed_to_update_match: '対戦表の更新に失敗しました',
    battles: {
      randomize_confirmation_dialog: {
        title: '{{isTeam, participation_type}}をランダムに配置します',
        subtitle: '現在エントリーしている{{isTeam, participation_type}}を対戦表の空欄になっている枠へランダムに配置します',
        description: `※エントリーしている{{isTeam, participation_type}}数が参加枠数よりも多い場合は、選択されなかったユーザーは落選となります。
        
                      ※落選する{{isTeam, participation_type}}を出したくない場合は、大会管理から参加枠数を変更した後に配置を行ってください。`,
        additionalText: 'この時点ではまだエントリー表は確定しません',
        confirmationText: '配置する',
        cancellationText: 'キャンセル',
      },
      freeze_confirmation_dialog: {
        title: '{{isTeam, participation_type}}をランダムに配置します',
        description: '現在エントリーしている{{isTeam, participation_type}}を対戦表の空欄になっている枠へランダムに配置します',
        additionalText: `※エントリーしている{{isTeam, participation_type}}数が参加枠数よりも多い場合は、選択されなかった{{isTeam, participation_type}}は落選となります。
                         ※落選する{{isTeam, participation_type}}を出したくない場合は、大会管理から参加枠数を変更した後に配置を行ってください。`,
        confirmationText: 'エントリー',
        cancellationText: 'キャンセル',
      },
    },
    dialog: {
      randomize_title: '{{isTeam, participation_type}}をランダムに配置します',
      randomize_desc: '現在エントリーしている{{isTeam, participation_type}}を{{isBattle}}の空欄になっている枠へランダムに配置します',
      randomize_sub1:
        '※エントリーしている{{isTeam, participation_type}}数が参加枠数よりも多い場合は、選択されなかった{{isTeam, participation_type}}は落選となります。',
      randomize_sub2:
        '※落選する{{isTeam, participation_type}}を出したくない場合は、大会管理から参加枠数を変更した後に配置を行ってください。',
      randomize_sub3: '※既に手動で登録されているユーザーはこのランダム配置を行っても移動しません。',
      randomize_warn: 'この時点ではまだエントリー表は確定しません',
      deploy_button: '配置する',
      confirm_button: '確定する',
      freeze_title: 'トーナメント表を確定する',
      freeze_desc: '現在の対戦表に登録されているユーザーで対戦表を確定させます。よろしいですか？',
      freeze_sub1: '※落選するユーザーを出したくない場合は、大会管理から参加枠数を変更した後に配置を行ってください。',
      freeze_sub2:
        '※エントリーしているユーザーであっても、対戦表に反映されていないまま確定を行った場合は残りの枠数を問わず落選となります。',
      freeze_warn: '確定以降の参加枠の変更はできません。',
    },
    no_match_result: '対戦結果が未入力です',
    edit_match_result: '対戦結果を編集する',
    win: 'WIN',
    please_select_winner: '勝者を選択してください',
    summary: '大会総括',
    summary_title: '大会の総括',
    summary_submit: 'この内容で決定する',
    copy_toast: '共有URLをコピーしました',
    edit_arena_info: '編集',
    create_success: '大会が作成されました',
    update_success: '大会内容が編集されました',
    temporary: 'Temporary',
    matches: {
      final_game: '決勝戦',
      semi_final: '準決勝',
      round: '回戦',
    },
    not_found: 'このページは無効化されました。',
    participants_limit: '2~128の数字を入力してください。',
    to_detail: '大会詳細',
    choice: '選択',
    double_zero: '00',
    cancelled: 'この大会は中止されました',
    not_held: 'この大会は実施されませんでした',
    participate_status: {
      participating: '参加中',
      loss: '落選',
      no_entry: '未エントリー',
      ongoing: '開催中',
    },
    result_not_decided: '大会結果が決定していません',
    entry_information: 'エントリー情報',
    update_with_content: 'この内容で更新する',
    see_app: 'バトルロイヤル形式の大会はアプリでご覧ください。',
    install_app: 'お手持ちのスマートフォンより、アプリをインストールしてください。',
  },
  recruitment: {
    recommended_recruitment_list: 'おすすめの募集一覧',
    recruitment_follower: 'フォローしている人の募集',
    close_recruitment: {
      button_text: 'メンバー確定',
    },
    date_time: '開催日時',
    participate_status: {
      no_entry: '実施中',
    },
    join_dialog: {
      dialog_title: 'エントリーしますか？',
    },
  },
  event: {
    recommended_event_list: 'おすすめイベント一覧',
  },
  topic: {
    topic_follower_list: 'フォローしている人の書き込みトピック',
    report: {
      button: 'トピックを通報',
      title: '通報するトピック',
      reported_topic: 'トピックを通報しました',
    },
    delete: {
      button: 'トピックの削除',
      title: 'を削除します',
      description: `削除したトピックはコメントも含めて復元させることはできません。
      削除してよろしいですか？`,
      submit: '削除する',
    },
  },
  topic_comment: {
    there_is_no_topic: '該当のトピックはありません。',
    report: {
      dialog_title: 'コメントを通報する',
      button: 'コメントを通報',
      title: '通報するコメント',
      reported_comment: 'コメントを通報しました',
    },
    delete: {
      button: 'コメントを削除',
      title: '投稿されたコメントを削除します',
      description: `削除したコメントを復元させることはできません。
      削除してよろしいですか？`,
      submit: '削除する',
      success_toast: 'コメントを削除しました。',
    },
    comment_not_exist: '該当のコメントは存在しません。',
    has_deleted_comment: 'この投稿は削除されました。',
    has_deleted_last_comment: 'この投稿は削除されました',
  },
  tournament_cancel: {
    confirm_cancel_btn: '大会を中止する',
    cancel_title: '大会を中止しますか？',
    cancel_detail1: '中止した大会は復元することはできません。',
    cancel_detail2: '大会の中止は、メンバーに通知されます。',
    cancel_button: '中止する',
    cancel_t: 'キャンセル',
  },
  tournament_create: {
    tab1: '大会概要',
    tab2: '開催形式',
    tab3: '期間・会場',
    tab4: '主催情報',
    title: '大会を作成する',
    edit_title: '大会を編集する',
    name: '大会名',
    has_prize: '副賞あり',
    hint: '副賞提供は各種法令を遵守した形で実施されますよう十分ご注意ください',
    game: 'ゲーム',
    game_hardware: 'ゲームハード',
    overview: '概要',
    please_enter: '入力してください',
    holding_format: '開催形式',
    sorting_method: 'ソート方法',
    sort_info_title: '昇順・降順について',
    /* eslint-disable no-irregular-whitespace */
    sort_info_content: `
昇順　入力値（スコアやタイム等）が小さい順に順位を決定します。
　　　例：入力値と順位の関係は下記のようになります。
　　　100→1位、200→2位、300→3位
降順　入力値（スコアやタイム等）が大きい順に順位を決定します。
　　　例：入力値と順位の関係は下記のようになります。
　　　300→1位、200→2位、100→3位`,
    has_third_place: '3位決定戦あり',
    participation: '参加形式',
    participation_term: '参加条件・ルール',
    participation_term_placeholder: 'キーワードを設けて、実施する大会を他ユーザーに見つけてもらいやすくすることができます。',
    precautions: '注意事項など',
    precautions_placeholder: `大会実施にむけて参加者に周知したいことなどを入力できます。

例）
この大会の主旨は初心者同士で練習することにあります。
煽りや誹謗中傷などはしないようにしましょう！`,
    retain_history: '戦績を保存する',
    retain_history_short: '戦績',
    people: '人',
    entry_period: 'エントリー期間',
    start_date: '開始日時',
    end_date: '終了日時',
    holding_period: '開催期間',
    area: '会場',
    area_address: '会場詳細',
    area_name_placeholder: `会場情報を入力しましょう。
とくにオンラインで開催する際は、何のツールを使うのか、明記することをおすすめいたします。`,
    organizer: '開催者',
    co_organizer: '共同管理者',
    organizer_name: '主催',
    submit: 'この内容で作成する',
    edit: 'この内容で編集する',
    check_content: '内容を確認する',
    decide: '決定する',
    add: '追加する',
    public: '公開',
    private: '限定公開',
    choose_co_organizer: '共同管理者を選ぶ',
    user_hint: '指定できるのは相互フォローユーザーのみです',
    not_found: '一致するユーザーは見つかりませんでした',
    public_or_private: '大会公開設定',
    public_or_private_short: '大会公開',
    title_placeholder: '60文字まで入力することができます。',
    overview_placeholder: `大会の概要などを任意で入力することができます。

例）
初心者同士で盛り上がれ！
楽しく練習しましょう〜の会です。`,
    prize_placeholder: '副賞を設ける場合はその内容を入力してください。',
    max_participants: '参加枠数',
    max_participants_placeholder: '○○○枠上限',
    comfirm_title: 'この内容で作成しますか？',
    confirm_edit_title: 'この内容で編集しますか？',
    check_content_button: '内容を確認する',
    please_review: 'を見直してください',
    end_time_invalid: '日時は現在の日時より後でなければなりません',
    status_changed: '大会の開催ステータスが変更されました、編集内容の見直しをお願いします',
  },
  arenaSearchFilters: {
    all: 'すべて',
    beforeStart: '開催前',
    inProgress: '開催中',
    completed: '終了',
    joined: 'あなたがエントリーした大会',
    organized: 'あなたが主催者の大会',
    ready: '受付前',
    recruiting: '受付中',
  },
  lobby: {
    copy_toast: 'クリップボードにコピーしました',
    lobby_results: '募集「:key」の検索結果',
    lobby_results_all: '募集の検索結果',
    until_deadline: '締め切りまであと',
    until_event: '開催まであと',
    end_from_minutes: '分に受付終了',
    start_from_minutes: '分から開始',
    group_chat: 'グループチャット',
    temporary: 'Temporary',
    cancel: '募集を中止する',
    detail: {
      label_id: '募集ID：',
      number_of_entries: 'エントリー数',
      number_of_entries_freezed: '参加数',
      organizer: '開催者',
      entry_period: 'エントリー期間',
      start_date: '開催日時',
    },
    card: {
      organizer: '開催者',
      start_date: '開催日',
      entry_period: 'エントリー期間',
      entries: 'エントリー人数',
    },
    cancel_lobby_dialog: {
      title: '募集を中止しますか？',
      description1: '中止した募集は復元することはできません。',
      description2: '募集の中止は、メンバーに通知されます。',
      additionalText: '',
      confirmationText: '中止する',
      cancellationText: 'キャンセル',
    },
    entry_confirmation_dialog: {
      title: 'エントリーしますか？',
      description: '',
      additionalText: '',
      confirmationText: 'エントリー',
      cancellationText: 'キャンセル',
    },
    decline_entry_dialog: {
      title: 'エントリーを辞退しますか？',
      description: '再度エントリーすることができます。',
      additionalText: '',
      confirmationText: '辞退する',
      cancellationText: 'キャンセル',
    },
    confirm_member_dialog: {
      shuffle: {
        title: 'ユーザーをランダムに選びますか？',
        description: '現在エントリーしているユーザーから参加者をランダムに選ぶことができます。',
        additionalText: 'この時点ではまだ参加者は確定しません',
        confirmationText: 'ランダムに選ぶ',
        cancellationText: 'キャンセル',
      },
      confirm: {
        title: '選択したメンバーで確定しますか？',
        description: '',
        additionalText: '確定後はメンバーの変更はできません',
        confirmationText: 'はい',
        cancellationText: 'いいえ',
      },
    },
    status: {
      entry_closed: '受付終了',
      entered: 'エントリー中',
      not_entered: '実施中',
      participated: '参加中',
      not_participated: '落選',
      ended: '終了',
      cancelled: 'この募集は中止されました',
    },
    remaining_date: {
      entry: 'エントリー',
      start: '開始',
      until: 'まであと',
      from_minutes: '分から',
      in_progress: '実施',
      freeze: '開催',
    },
    buttons: {
      temporary: 'Temporary',
      member_list: 'エントリーメンバー',
      member_list_confirmed: '参加メンバー',
      entry: 'エントリーする',
      decline: 'エントリーを辞退する',
      member_confirm: 'メンバー確定',
      description: 'エントリー期間終了時、自動的にエントリーが締め切られます',
    },
    tabs: {
      ready: '受付前',
      recruiting: '受付中',
      entry_closed: '受付締切',
      in_progress: '本日開催',
      ended: '終了',
    },
    toasts: {
      edit: '編集を完了しました',
      create: '募集を作成しました',
      entry: 'エントリー完了しました',
      entry_failed: 'エントリー完了できませんでした',
      entry_decline: 'エントリーを辞退しました',
      entry_decline_failed: 'エントリーを辞退できませんでした',
      randomize_participant: 'ユーザーをランダムに選びました',
      confirm_participant: 'エントリーを締め切りました',
      edit_status_changed: '募集の開催ステータスが変更されました、編集内容の見直しをお願いします',
    },
    create: {
      submit: 'この内容で作成する',
      review: '内容を確認する',
      category: 'カテゴリ',
      choose_category: 'カテゴリを選ぶ',
      name: '募集タイトル',
      overview: '概要',
      overview_placeholder: `入力してください`,
      game_hardware: 'ゲームハード',
      max_participants: '参加上限',
      max_participants_placeholder: '○○○人上限',
      organizer_participated: '主催者を参加者として抽選に含める',
      entry_period: 'エントリー期間',
      start_date: '開始日時',
      end_date: '終了日時',
      recruitment_start_date: '開催日時',
      area: '会場',
      area_name_placeholder: `会場情報を入力しましょう。
  とくにオンラインで開催する際は、何のツールを使うのか、明記することをおすすめいたします。`,
      please_review: 'を見直してください',
      holding_period: '開催日時',
      address: '会場詳細',
    },
    edit: {
      submit: 'この内容で編集する',
    },
    home: {
      recent_lobbies_title: 'フォローしている人の募集',
      recent_lobbies_empty: '該当の募集は存在しません',
    },
    discard: {
      title: '内容を破棄します',
      message: '画面を戻ると、現在の入力内容は破棄されます。よろしいですか？',
      message_part1: '画面を戻ると、現在の入力内容は破棄されます。',
      message_part2: 'よろしいですか？',
      confirm: '内容を破棄して戻る',
    },
  },
  lobbySearchFilters: {
    all: 'すべて',
    suggested: 'おすすめの募集',
    beforeStart: 'エントリー受付中',
    inProgress: 'エントリー中の募集',
    organized: 'あなたが作成した募集',
  },
  communitySearchFilters: {
    joined: '参加しているコミュニティ',
    organized: '管理しているコミュニティ',
  },
  search: {
    search: '検索',
    tournament_id: '大会ID：',
    rule_format: '大会形式',
    prize: '副賞',
    entry_period: 'エントリー期間',
    holding_period: '開催期間',
    venue: '開催場所',
    retain_history: '戦績保存',
    participant_type: '参加形式',
    participation_condition: '参加条件',
    admin_organizer: '開催者',
    co_organizer: '共同管理者',
    organizer_name: '主催',
    game: 'ゲーム',
    game_hardware: 'ゲームハード',
    copy_url: '大会URLのコピー',
    report: '通報',
    search_placeholder: 'キーワード検索',
    nickname: 'ニックネーム・ID',
    arena: '大会',
    lobby: '募集',
    community: 'コミュニティ',
  },
  user_profile: {
    edit_profile: 'プロフィールを編集',
    profile: 'プロフィール',
    tournament_history: '大会履歴',
    activity_log: 'アクティビティ',
    set_two_names: '二つ名を設定する',
    self_introduction: '自己紹介',
    tag_edit: 'タグ編集',
    sns: 'SNS',
    choose_game: 'ゲームを選ぶ',
  },
  action_types: {
    topic_comment_px: '【トピック】',
    topic_comment_sx: 'へコメントしました。',
    topic_create_px: '【トピック】',
    topic_create_sx: 'を作成しました。',
    community_create_px: '【コミュニティ】',
    community_create_sx: 'を作成しました。',
    community_join_px: '【コミュニティ】',
    community_join_sx: 'に参加しました。',
    user_follows_px: '',
    user_follows_sx: 'さんをフォローしました。',
    recruitment_create_px: '【募集】',
    recruitment_create_sx: 'を作成しました。',
    recruitment_entry_px: '【募集】',
    recruitment_entry_sx: 'にエントリーしました。',
    tournament_create_px: '【大会】',
    tournament_create_sx: 'を作成しました。',
    tournament_entry_px: '【大会】',
    tournament_entry_sx: 'にエントリーしました。',
  },
  chat: {
    title: 'メッセージ',
    no_user_available: '一致するデータが見つかりません',
    back_list: '宛先',
    create_new: '新規作成',
    placeholder: 'メッセージを入力',
    copy_content: '内容のコピー',
    reply_msg: '引用返信',
    report_chat: '通報',
    room_options: {
      member_list: 'メンバーリスト',
      add_member: 'メンバーの追加',
      change_room_name: 'グループ名の変更',
      change_img: 'アイコンを変更',
      exit: '退出する',
    },
    uploaded_image: '画像がアップロードされました',
    placeholder_dm: 'メッセージ権限がありません',
    delete_member: 'グループから除外',
    toast_delete_member: 'メンバーを除外しました',
    room_not_found: 'ルームが見つかりませんでした',
    delete_chat: '削除',
    see_tournament: '該当の大会をみる',
    see_lobby: '該当の募集をみる',
    lets_start: 'メッセージを入力',
    select_destination: '宛先を選んでください',
    already_member: '既にメンバーです',
    chat_copied: 'メッセージ内容をコピーしました',
    member_add_placeholder: 'ニックネーム',
    member_add_title: 'メンバーの追加',
    member_add_toast: 'メンバーを追加しました',
    room_name_placeholder: 'グループ名を入力',
    reply_img_text: '写真',
    not_selected_text: 'メッセージを始めましょう',
    member_list_title: 'メンバーリスト',
    add_submit: '追加する',
    toast: {
      room_name_changed: 'グループ名を変更しました',
      room_image_success: 'グループアイコンを変更しました',
    },
    destination: '宛先',
    name_change_submit: '変更する',
  },
  notification: {
    title: '通知一覧',
  },
  confirm: {
    sent: 'メールアドレスに送信された',
    verification_code: '6桁の認証コードを入力してください',
    resend: '認証コードを再送する',
    dont_receive: '認証コードが届かない場合',
    send_again: '入力したメールアドレスに誤りがある可能性があります。前の画面に戻り、もう一度送信してください。',
  },
  forgot_password: {
    title: 'パスワードの再発行',
    email: '登録済みメールアドレス',
    send: '認証コードを送信',
    reissue: '再発行する',
  },
  confirmation_review: '入力情報の確認',
  fix: '修正する',
  qr: 'QRコード',
  logout: 'ログアウト',
  qr_screen: {
    title: 'QRコードは株式会社デンソーウェーブの商標登録です',
  },
  logout_screen: {
    title: 'eXeLABからログアウトしますか？',
    desc: 'いつでもログインし直すことができます。',
    cancel: 'キャンセル',
    ok: 'ログアウト',
  },
  cancel: 'キャンセル',
  member: 'メンバー',
  you: 'あなた',
  icon: 'アイコン',
  team_name: 'チーム名',
  account_settings: {
    title: 'アカウント設定',
    sns: 'SNS',
    membership_type: '会員種別',
    general_member: '一般会員',
    delete_account: 'アカウントを削除する',
    change_email_address: 'メールアドレスの変更',
    current_email: '現在のメールアドレス',
    new_email_title: '新しいメールアドレス',
    new_email_placeholder: 'sample@exelab.jp',
    confirm_title: `メールアドレスに送信された
6桁の認証コードを入力してください`,
    delete_confirm_title: 'アカウント削除について',
    delete_confirm_msg: 'アカウント削除はお問い合わせフォームでの申請となります。お問い合わせフォームを開きますか。',
    delete_confirm_yes: 'はい',
    delete_confirm_no: 'いいえ',
    change_password: 'パスワードの変更',
    current_password: '現在のパスワード',
    new_password: '新しいパスワード',
    new_password_re_enter: '新しいパスワード（再入力）',
    hint: '8文字以上の半角英数字を入力してください',
    hint2: 'パスワードは英大文字、英小文字、数字を一文字以上使用してください',
    hint3: '前回と同じパスワードは利用できません',
    change_email_success: 'メールアドレスを変更しました',
    change_password_success: 'パスワードを変更しました',
    sent_resend_code: '認証コードメールを再度送信しました',
  },
  my_page_settings: {
    title: 'マイページの情報公開範囲',
    tournament_title: '大会履歴',
    activity_title: 'アクティビティ',
    profile_title: 'プロフィール',
  },
  message_settings: {
    title: 'メッセージの受信設定',
    receive_messages_from_anyone: '誰からでもメッセージを受け取る',
    receive_invitations_from_anyone: '誰からでもメッセージグループの招待を受け取る',
  },
  block_settings: {
    title: 'ブロックしたユーザー',
    unblock_success: '該当のユーザをブロック解除しました',
  },
  security_settings: {
    title: 'セキュリティ',
    my_page: 'マイページの情報公開範囲',
    message: 'メッセージの受信設定',
    block: 'ブロックしたユーザー',
  },
  notification_settings: {
    title: '通知設定',
    settings_select_all: '一括設定',
  },
  service_info: {
    title: 'サービス情報',
    enterprise_info: '企業情報（NTTe-Sports）',
    faq: 'FAQ',
    inquiry: 'お問い合わせ',
  },
  purchase_history: {
    title: '購入履歴',
    detail: '履歴詳細',
    order_id: '購入ID',
    vendor: '販売元',
    vendor_name: 'NTTe-Sports',
    ticket_name: 'アイテム',
    type: '区分',
    price: '購入金額',
    unit_price: '単価',
    purchase_status: '購入ステータス',
    status: 'ステータス',
    payment_method: '支払い方法',
    payment_type_gmo: 'GMOペイメント',
    payment_type_none: 'なし',
    questions: 'よくあるお問い合わせ',
    about_purchase_status: '購入ステータスについて',
    about_cancellation: 'キャンセルについて',
    help_purchase: '購入に心当たりがない',
    item: 'アイテム',
    classification: '区分',
    ticket: 'チケット',
    quantity: '数量',
    total_fee: '合計金額',
    total: '総合計',
    tax: '消費税',
    payment: '支払金額',
    canceled: 'キャンセル済み',
    cancel_requested: 'キャンセル処理中',
    cancel_request: '注文をキャンセル',
    purchased: '購入済み',
    cancel_order_title: '注文をキャンセルします',
    cancel_order_msg: 'キャンセルを行なった後に再利用する場合は再度ご購入が必要です。',
    dialog_close: '戻る',
    cancel_submit: 'キャンセルする',
    cancel_msg: 'アイテムの購入をキャンセルしました',
    no_data: '購入されたアイテムはありません',
    period_expired: 'キャンセル処理できませんでした。\n' + 'キャンセル受付期間を超過したため、キャンセル処理できませんでした。',
  },
  inquiry: {
    title: 'お問い合わせ',
    title_required: '入力内容が適切ではありません。',
    subject: '件名',
    email: 'メールアドレス',
    desc: '本文',
    desc_required: '入力内容が適切ではありません。',
    desc_placeholder: 'お問い合わせ内容を入力してください',
    send: '送信する',
    next: '決定',
    go_home: 'ホームへ戻る',
    success_message: `お問い合わせを受け付けました。
    順番に回答させていただいておりますのでお待ちいただけますようお願いいたします。`,
    go_edit: '内容を変更する',
    email_required: 'お問い合わせにはメールアドレスの登録が必須となります。',
    error: {
      email: '入力内容が適切ではありません。',
    },
  },
  settings: {
    title: '設定',
    account_settings: 'アカウント設定',
    security_settings: 'セキュリティ',
    notification_settings: '通知設定',
    purchase_history: '購入履歴',
    service_info: 'サービス情報',
    terms: '利用規約',
    personal_info: '個人情報の取り扱いについて',
    commercial_transaction: '特定商取引に関する表記',
  },
  dialog: {
    ng_word_warning: '下記項目内にNGワードが含まれています。',
    ng_word_area_label: 'チェック項目：',
    confirm: '了解',
    default_title: '確認メッセージ',
  },
  ng_word_area: {
    chat_section: 'メッセージテキストボックス',
    room_name_title: 'グループ名',
    comment_section: 'メッセージテキストボックス',
  },
  page_head: {
    default_desc:
      '“人と人がつながる”ことで、ゲームはもっともっと楽しくなります。つながりが生む新たな体験と発見、そしてたくさんのプレイヤーとシーンを支えるファン達が交差するプラットフォーム。それがeXeLAB（エグゼラボ）です。',
    default_keywords: 'eXeLAB,エグゼラボ,game.ゲーム,ゲーマー,esports,eスポーツ,NTTe-sports,大会運営,ゲーム仲間,募集,コミュニティ',
    home_top: 'eXeLAB｜ゲームが広がる。仲間ができる。',
    home_title: 'eXeLAB｜ホーム',
    arena_default_title: 'eXeLAB｜大会',
    arena_detail_title: 'eXeLAB｜大会情報',
    arena_matches_title: 'eXeLAB｜対戦表',
    arena_winners_title: 'eXeLAB｜大会結果',
    arena_members_title: 'eXeLAB｜出場メンバー',
    arena_entry_title: 'eXeLAB｜エントリー',
    arena_summary_title: 'eXeLAB｜大会総括',
    lobby_default_title: 'eXeLAB｜ロビー',
    lobby_detail_title: 'eXeLAB｜ロビー情報',
    community_default_title: 'eXeLAB｜コミュニティ',
    community_detail_title: 'eXeLAB｜コミュニティ情報',
    community_topic_default_title: 'eXeLAB｜トピック',
    community_topic_detail_title: 'eXeLAB｜トピック情報',
  },
  lobby_create: {
    tab1: '募集概要',
    tab2: '期間・会場',
    title: '募集を作成する',
    edit_title: '募集を編集する',
    name: '募集タイトル',
    has_prize: '副賞あり',
    hint: '副賞提供は各種法令を遵守した形で実施されますよう十分ご注意ください',
    game: 'ゲーム',
    category: 'カテゴリ',
    game_hardware: 'ゲームハード',
    overview: '概要',
    please_enter: '入力してください',
    holding_format: '開催形式',
    has_third_place: '3位決定トーナメントあり',
    participation: '参加形式',
    participation_term: '参加条件・ルール',
    participation_term_placeholder: 'キーワードを設けて、実施する大会を他ユーザーに見つけてもらいやすくすることができます。',
    precautions: '注意事項など',
    precautions_placeholder: `大会実施にむけて参加者に周知したいことなどを入力できます。
  
  例）
  この大会の主旨は初心者同士で練習することにあります。
  煽りや誹謗中傷などはしないようにしましょう！`,
    retain_history: '戦績を保存する',
    retain_history_short: '戦績',
    people: '人',
    entry_period: 'エントリー期間',
    start_date: '開始日時',
    end_date: '終了日時',
    holding_period: '開催期間',
    recruitment_start_date: '開催日時',
    area: '会場',
    area_name_placeholder: `会場情報を入力しましょう。
とくにオンラインで開催する際は、何のツールを使うのか、明記することをおすすめいたします。`,
    area_detail: '会場詳細',
    organizer: '開催者',
    co_organizer: '共同管理者',
    organizer_name: '主催',
    submit: 'この内容で作成する',
    check_content: '内容を確認する',
    decide: '決定する',
    add: '追加する',
    choose_category: 'カテゴリを選ぶ',
    public: '公開',
    private: '限定公開',
    choose_co_organizer: '共同管理者を選ぶ',
    user_hint: '指定できるのは相互フォローユーザーのみです',
    not_found: '一致するユーザーは見つかりませんでした',
    public_or_private: '大会公開設定',
    title_placeholder: '60文字まで入力することができます。',
    overview_placeholder: `入力してください`,
    prize_placeholder: '副賞を設ける場合はその内容を入力してください。',
    max_participants: '参加上限',
    max_participants_placeholder: '○○○人上限',
    comfirm_title: 'この内容で作成しますか？',
    confirm_edit_title: 'この内容で編集しますか？',
    check_content_button: '内容を確認する',
    organizer_joinable: '主催者を参加者として抽選に含める',
    organizer_joined: '開催者を参加者として抽選に含める',
    organizer_join: '含める',
    organizer_unjoin: '含めない',
  },
  community_create: {
    title: 'コミュニティを作成する',
    input_required: '入力内容が適切ではありません。',
    edit_title: '募集を作成する',
    name: 'コミュニティ名',
    introduction: 'コミュニティ紹介文',
    introduction_placeholder: '入力してください',
    game: 'ゲーム',
    game_placeholder: '選択されていません',
    area: 'エリア',
    area_detail: 'エリア詳細',
    area_name_placeholder: 'エリア情報を記載',
    public_or_private: 'コミュニティ公開設定',
    public: '公開',
    private: '非公開',
    participation_approval: '参加承認',
    approval_automatic: '自動承認',
    approval_manual: '手動承認',
    choose_tag: 'コミュニティタグを選ぶ',
    tag: 'コミュニティタグ',
    decide: '決定する',
    check_content: '内容を確認する',
    discard: {
      title: '内容を破棄します',
      message: '画面を戻ると、現在の入力内容は破棄されます。よろしいですか？',
      confirm: '内容を破棄して戻る',
      edit_title: '内容を破棄します',
      edit_confirm: '内容を破棄して戻る',
      edit_message: '画面を戻ると、現在の入力内容は破棄されます。よろしいですか？',
    },
    confirm: {
      title: 'この内容で作成しますか？',
      title_edit: 'この内容で編集しますか？',
      submit: '作成する',
      submit_edit: '編集する',
    },
    edit: {
      title: 'コミュニティを編集する',
      disband_button: 'コミュニティを解散する',
      check_edited_content: '内容を確認する',
    },
    disband: {
      title: 'コミュニティを解散する',
      submit: 'コミュニティを解散する',
      disband_community: '解散させるコミュニティ',
      description: `コミュニティを解散します。
      一度解散したコミュニティのトピックやアップロードした画像は復元できません。`,
      disbanded_toast: 'コミュニティを解散しました。',
    },
    community_created_toast: 'コミュニティを作成しました',
    community_updated_toast: 'コミュニティを編集しました',
    title_already_in_use: 'コミュニティ名が既に使用中です。',
  },
  topic_create: {
    title: 'トピックを作成する',
    name: 'トピック名',
    text: '本文',
    please_enter: '入力してください。',
    confirm: 'この内容でトピックを作成しますか？',
    preview: 'プレビュー',
    discard: {
      title: '内容を破棄します',
      message: '画面を戻ると、現在の入力内容は破棄されます。よろしいですか？',
      confirm: '内容を破棄して戻る',
    },
    create_success: 'トピックを作成しました',
    comment_placeholder: 'コメントを入力…',
  },
}
