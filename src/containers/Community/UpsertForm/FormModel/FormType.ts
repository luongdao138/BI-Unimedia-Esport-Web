export type FormType = {
  stepOne: {
    cover_image_url: string
    name: string
    overview: string
    game_titles: any[] | []
    features: any[] | []
    area_id: number
    address: string
    open_range: 0 | 1
    join_condition: 0 | 1
  }
}
