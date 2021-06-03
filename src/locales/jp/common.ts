export default {
  common: {
    birthday: '生年月日',
    year: '年',
    month: '月',
    day: '日',
    gender: '性別',
    male: '男性',
    female: '女性',
    other: 'その他',
    required: '必須',
    private: '非公開',
    zero: '0',
    see_more: 'もっと見る',
    at: '@',
    search_results: '検索結果',
    total: '件',
    error: 'エラー文言が入ります',
    too_long: '長すぎる',
    at_least: '2文字以上入力してください。',
    at_least_8: '8文字以上で入力してください',
    contains_ngword: '不適切な文字列が含まれています。',
    user_code_invalid: 'ユーザーIDには（英数字、_、-）のみ入力可能です',
    not_selected: '選択されていません',
    save: '保存する',
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
    validation: {
      acceptance_dates: 'エントリー開始日時はエントリー終了日時より前にしてください',
      acceptance_end_start_date: 'エントリー終了日時は開始日時より前にしてください',
      start_end_date: '開始日時は終了日時より前にしてください',
      min_date: '日時は現在の日時より後でなければなりません',
      prize_non_cash: '※現金等を副賞とするのはご遠慮ください。',
    },
    no_data: '対象データありません',
    dash: '-',
    team: 'チーム',
    send: '送信する',
    select_an_image: '画像を選択',
    password_duplicated: 'パスワード再設定できませんでした。',
    confirmation_expire: '認証できませんでした。',
  },
  welcome: 'eXeLABへようこそ',
  messages: {
    discord_id_copied: 'Discordタグをクリップボードにコピーしました。',
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
    no_recruiting_tournament: '現在予定している大会はありません。',
  },
  button: {
    twitter: 'Twitterでログイン',
    google: 'Googleでログイン',
    line: 'LINEでログイン',
    facebook: 'Facebookでログイン',
    apple: 'Appleでログイン',
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
    intro_hint1: 'eXeLABをお楽しみいただくには',
    intro_hint2: 'ログインが必要です',
    validation: {
      email: 'メールアドレスが間違っています。',
      password: 'パスワードが間違っています。',
    },
    error: {
      title: 'ログインできませんでした',
      detail: `以下の可能性がございます。
        １. メールアドレスに誤りがある
        ２. パスワードに誤りがある
        ３. SNS連携でアカウントを作成している`,
      hint:
        '上記以外でログインできない場合は、アカウントがロックされている可能性がございます。パスワードを設定していただくか、しばらく経ってからもう一度ログインしてください。',
      title2: 'SNSでのログインに失敗しました',
      detail2: `以下の可能性がございます。
      １. ダミーテキスト
      ２. ダミーテキスト
      ３. ダミーテキスト`,
      hint2:
        'ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミー',
    },
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
      detail: `以下の可能性がございます。
      １. ダミーテキスト
      ２. ダミーテキスト
      ３. 同じアカウントですでにSNS連携での新規登録を行なっている(ダミー)`,
      hint: '他にも文言がいるならこの色で。他にも文言がいるならこの色で。他にも文言がいるならこの色で。他にも文言がいるならこの色で。',
      title2: '新規登録に失敗しました',
      detail2: `以下の可能性がございます。
      １. メールアドレスに誤りがある(ダミー)
      ２. パスワードに誤りがある(ダミー)
      ３. SNS連携ですでにアカウントを作成している(ダミー)`,
      hint2: '他にも文言がいるならこの色で。他にも文言がいるならこの色で。他にも文言がいるならこの色で。他にも文言がいるならこの色で。',
    },
    resend_success: '認証コードメールを再度送信しました。',
  },
  register_by_email: {
    email: 'メールアドレス',
    forgot_password: 'パスワードをお忘れの場合',
    email_placeholder: 'sample@exelab.jp',
    password: 'パスワード',
    hint: '8文字以上の半角英数字を入力してください',
    hint2: 'パスワードは英大文字、英小文字、数字を1文字以上使用してください',
    button: '次へ',
    back: 'メールアドレスで登録',
    sns: 'SNS連携で登録',
    duplicated: 'そのIDは既に使用されています',
  },
  register_profile: {
    user_id: 'ユーザーID',
    nickname: 'ニックネーム',
    hint: 'ユーザーIDはあとから変更ができません',
    hint2: '半角英数字、”+_-”が使用できます',
  },
  error: {
    login_failed: 'ログインに失敗しました。',
    code_invalid: '入力されたコードは無効です',
    user_settings_failed: 'User settings failed',
    signup_failed: '登録に失敗しました。',
    failed: '失敗しました',
    password_reissue: 'パスワードを再発行しました',
    close_arena_failed: 'Failed to close arena',
    join_arena_failed: 'Failed to entry arena',
    leave_arena_failed: 'Failed to leave arena',
    too_short: '短すぎます。',
    password_must_match: 'パスワードが一致していません。',
    error_4221: 'パスワードが一致していません。',
    email_invalid: '有効なメールアドレスを入力してください',
    same_email: '現在のメールアドレスと同一のメールアドレスです！違うメールアドレスを入力してください。',
    error_email_4221: 'メールアドレスが見つかりませんでした',
    error_email_4222: 'メールアドレスが既に使用されています！',
    password_failed: 'パスワードポリシーを満たしていません。',
    invalid_date: '適切な日付を入力してください。',
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
    tournament_follow: 'フォローしている人がエントリーしている大会',
    tournament_result: 'フォローしている人がエントリーしていた大会結果',
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
  },
  infinite_scroll: {
    message: 'あなたはそれをすべて見ました',
  },
  followers: {
    title: 'フォロー中',
    th: '人',
  },
  following: {
    title: 'フォロワー',
    th: '人',
  },
  user_report: {
    title: '通報する',
    desc_first: '通報内容をご確認のうえ必要情報を記載、選択してください',
    desc_second: 'また、通報いただいた内容は全て運営が確認をいたしますが、その際の対応',
    desc_third: '及び返信を行わない場合がある旨、予めご了承ください',
    user_info_title: '通報する内容',
    reason: '通報する理由',
    reason_desc: '詳細・補足',
    require: '※必須',
    reporter_email: 'メールアドレスの確認',
    reporter_email_placeholder: 'mail address',
    reporter_email_confirm: '通報にはメールアドレスの登録が必要となります。',
    btn_text: '通報する',
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
      search_by_keyword: 'キーワードで探す',
      search_by_genre: 'ジャンルから探す',
      create_new: '新しく作る',
      genre: 'ジャンル：',
      genre_label: 'ゲームジャンル',
      add_success: 'ゲームを新しく追加しました',
    },
    edit: '編集',
    edit_profile: 'プロフィールを編集する',
    read_more: 'もっとみる',
    follow_as: 'フォローする',
    inbox: 'inbox',
    menu_block: 'ブロック',
    menu_unblock: 'ブロックを解除する',
    menu_report: '通報',
    following: 'フォロー中',
    followers: 'フォロワー',
    no_game_selected: 'No game selected',
    no_tag_selected: 'No tag selected',
    no_tag_available: 'No tag available',
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
  search_by_keyword: 'キーワード検索',
  please_select: '選択してください',
  user: {
    user_results: 'ニックネーム・ID「:key」 の検索結果',
    user_results_all: 'ニックネーム・IDの検索結果',
  },
  tournament: {
    card_date: '開　催　日',
    organizer: '主催者',
    entry: 'エントリー',
    rule: {
      single: 'トーナメント',
      battle_royale: 'バトルロイヤル',
    },
    has_prize_true: '副賞あり',
    online: 'オンライン',
    offline: 'オフライン',
    participant: {
      back: 'エントリーメンバー',
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
    report: '通報',
    entry_members: 'エントリーメンバー',
    number_of_entries: 'エントリー数',
    rule_single: '個人戦',
    rule_double: 'トーナメント',
    rule_battle: 'バトルロイヤル',
    tournament_results: '大会「:key」 の検索結果',
    tournament_results_all: '大会の検索結果',
    follower_entering: 'フォローしている人がエントリーしている大会',
    follower_ended: 'フォローしている人がエントリーしていた大会結果',
    recruiting_tournament_list: '募集中の大会一覧',
    select_user: 'ユーザーを選ぶ',
    set_participants: '設定する',
    unset_participants: 'サブボタン',
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
      warning: 'エントリー募集の再開はできません',
    },
    join: 'エントリーする',
    unjoin: 'エントリーを辞退する',
    join_with_this: 'この内容でエントリーする',
    join_nickname: 'エントリーネーム',
    join_nickname_setting: 'エントリーネームの設定',
    join_nickname_setting_desc: '次の画面でエントリーネームを変更できます',
    participants: '参加メンバー',
    group_chat: 'グループチャット',
    brackets: '対戦表',
    until_deadline: '締め切りまであと',
    current_round: '{{round_number}}回戦目 対戦中',
    confirm_brackets: '大会開始前に対戦表を確定してください',
    confirm_brackets_desc_tail: 'が確定していない場合はエントリーが無効となるのでご注意ください',
    results: '大会結果',
    summary: '大会の総括',
  },
  arena: {
    randomize_button: 'ランダムに配置する',
    freeze_button: 'トーナメント表を確定する',
    randomize_success: 'ユーザーを配置しました',
    freeze_success: 'トーナメント表が確定しました',
    dialog: {
      randomize_title: 'ユーザーをランダムに配置します',
      randomize_desc: '現在エントリーしているユーザーをトーナメント表の空欄になっている枠へランダムに配置します',
      randomize_sub1: '※エントリーしているユーザー数が参加枠数よりも多い場合は、選択されなかったユーザーは落選となります。',
      randomize_sub2: '※落選するユーザーを出したくない場合は、大会管理から参加枠数を変更した後に配置を行ってください。',
      randomize_warn: 'この時点ではまだエントリー表は確定しません',
      deploy_button: '配置する',
    },
    no_match_result: '対戦結果が出ていません',
    edit_match_result: '対戦結果を編集する',
    win: 'WIN',
    please_select_winner: '勝者を選択してください',
    summary: '大会総括',
    summary_title: '大会の総括',
    summary_submit: 'この内容で決定する',
    copy_toast: '大会詳細URLをコピーしました。',
  },
  recruitment: {
    recommended_recruitment_list: 'おすすめの募集一覧',
    recruitment_follower: 'フォローしている人の募集',
  },
  event: {
    recommended_event_list: 'おすすめイベント一覧',
  },
  topic: {
    topic_follower_list: 'フォローしている人の書き込みトピック',
  },
  tournament_create: {
    tab1: '大会概要',
    tab2: '開催形式',
    tab3: '期間・会場',
    tab4: '主催情報',
    title: '大会を作成する',
    name: '大会名',
    has_prize: '副賞あり',
    prize_placeholder: '副賞の内容',
    hint: '副賞提供は各種法令を遵守した形で実施されますよう十分ご注意ください',
    game: 'ゲーム',
    game_hardware: 'ゲームハード',
    overview: '概要',
    please_enter: '入力してください',
    holding_format: '開催形式',
    has_third_place: '3位決定トーナメントあり',
    participation: '参加形式',
    participation_term: '参加条件やルールなど',
    precautions: '注意事項など',
    retain_history: '戦績を保存する',
    people: '人',
    entry_period: 'エントリー期間',
    start_date: '開始日',
    end_date: '終了日',
    holding_period: '開催期間',
    area: '会場',
    area_name: '会場情報を記載',
    organizer: '開催者',
    co_organizer: '共同管理者',
    organizer_name: '主催',
    submit: 'この内容で作成する',
    decide: '決定する',
    public: '公開',
    private: '限定公開',
    co_orgonizer: '共同管理者を選ぶ',
    user_hint: '指定できるのは相互フォローユーザーのみです',
    not_found: '一致するユーザーは見つかりませんでした',
    public_or_private: '公開設定',
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
    search_placeholder: 'キーワードで探す',
  },
  user_profile: {
    edit_profile: 'プロフィールを編集',
    profile: 'プロフィール',
    tournament_history: '大会履歴',
    activity_log: 'アクティビティ',
    set_two_names: '二つ名を設定するt',
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
    no_user_available: 'No user available',
    back_list: '宛先',
    create_new: '新規作成',
    placeholder: 'メッセージを入力…',
    copy_content: '内容のコピー',
    reply_msg: '引用返信',
    report_chat: '通報',
    room_options: {
      member_list: 'メンバー一覧',
      add_member: 'メンバーの追加',
      change_room_name: 'グループ名を変更',
      change_img: 'アイコンを変更',
      exit: '退出する',
    },
    uploaded_image: '画像がアップロードされました。',
  },
  notification: {
    title: '通知一覧',
  },
  confirm: {
    sent: 'メールアドレスに送信された',
    verification_code: '6桁の認証コードを送信しました',
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
    new_email: '新しいメールアドレス',
    confirm_title: `メールアドレスに送信された
6桁の認証コードを入力してください`,
    change_password: 'パスワードの変更',
    current_password: '現在のパスワード',
    new_password: '新しいパスワード',
    new_password_re_enter: '新しいパスワード（再入力）',
    hint: '8文字以上の半角英数字を入力してください',
    hint2: 'パスワードは英大文字、英小文字、数字を1文字以上使用してください',
    change_email_success: 'メールアドレスを変更しました',
    change_password_success: 'パスワードを変更しました',
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
  inquiry: {
    title: 'お問い合わせ',
    subject: '件名',
    email: 'メールアドレス',
    desc: '本文',
    desc_placeholder: 'お問い合わせ内容を入力してください',
    send: '送信する',
    next: '決定',
    go_home: 'ホームへ戻る',
    success_message: `お問い合わせを受け付けました。
    順番に回答させていただいておりますのでお待ちいただけますようお願いいたします。`,
    go_edit: '内容を変更する',
    error: {
      email: 'お問い合わせにはメールアドレスの登録が必須となります。',
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
    personal_info: '個人情報の取扱について',
    commercial_transaction: '特定商取引に関する表記',
  },
}
