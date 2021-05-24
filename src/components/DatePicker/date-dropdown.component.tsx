/* eslint-disable @typescript-eslint/ban-types */
import * as React from 'react'
import { monthByNumber, daysInMonth } from './date-dropdown-helper'
import ESSelect from '@components/Select'
import { Grid } from '@material-ui/core'

export enum DropdownComponent {
  year = 'year',
  month = 'month',
  day = 'day',
}

interface IProps {
  startDate?: string
  endDate?: string
  selectedDate?: string
  order?: DropdownComponent[]
  onMonthChange?: Function
  onDayChange?: Function
  onYearChange?: Function
  onDateChange?: Function
  ids?: {
    year?: string
    month?: string
    day?: string
  }
  names?: {
    year?: string
    month?: string
    day?: string
  }
  classes?: {
    dateContainer?: string
    yearContainer?: string
    monthContainer?: string
    dayContainer?: string
    year?: string
    month?: string
    day?: string
    yearOptions?: string
    monthOptions?: string
    dayOptions?: string
  }
  defaultValues?: {
    year?: string
    month?: string
    day?: string
  }
  options?: {
    yearReverse?: boolean
    monthShort?: boolean
    monthCaps?: boolean
  }
}

interface IState {
  startYear: number
  startMonth: number
  startDay: number
  endYear: number
  endMonth: number
  endDay: number
  selectedYear: number
  selectedMonth: number
  selectedDay: number
}

export class DropdownDate extends React.Component<IProps, IState> {
  renderParts: any

  constructor(props: IProps) {
    super(props)
    const { startDate, endDate, selectedDate } = props
    const sDate = startDate ? new Date(startDate) : new Date('1900-01-01')
    const eDate = endDate ? new Date(endDate) : new Date()
    const selDate = selectedDate ? new Date(selectedDate) : null
    this.state = {
      startYear: sDate.getFullYear(),
      startMonth: sDate.getMonth(),
      startDay: sDate.getDate(),
      endYear: eDate.getFullYear(),
      endMonth: eDate.getMonth(),
      endDay: eDate.getDate(),
      selectedYear: selDate ? selDate.getFullYear() : -1,
      selectedMonth: selDate ? selDate.getMonth() : -1,
      selectedDay: selDate ? selDate.getDate() : -1,
    }
    this.renderParts = {
      year: this.renderYear,
      month: this.renderMonth,
      day: this.renderDay,
    }
  }

  static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
    const selDate = nextProps.selectedDate ? new Date(nextProps.selectedDate) : null
    const tempSelDate = {
      selectedYear: selDate ? selDate.getFullYear() : -1,
      selectedMonth: selDate ? selDate.getMonth() : -1,
      selectedDay: selDate ? selDate.getDate() : -1,
    }
    if (tempSelDate.selectedYear !== prevState.selectedYear) {
      return { selectedYear: tempSelDate.selectedYear }
    }
    if (tempSelDate.selectedMonth !== prevState.selectedMonth) {
      return { selectedMonth: tempSelDate.selectedMonth }
    }
    if (tempSelDate.selectedDay !== prevState.selectedDay) {
      return { selectedDay: tempSelDate.selectedDay }
    }
    return null
  }

  generateYearOptions() {
    const { classes, options, defaultValues } = this.props
    const { startYear, endYear } = this.state
    const yearOptions = []
    yearOptions.push(
      <option key={-1} value="-1" className={classes && classes.yearOptions ? classes.yearOptions : undefined}>
        {defaultValues && defaultValues.year ? defaultValues.year : ''}
      </option>
    )
    if (options && options.yearReverse) {
      for (let i = endYear; i >= startYear; i--) {
        yearOptions.push(
          <option key={i} value={i} className={classes && classes.yearOptions ? classes.yearOptions : undefined}>
            {i}
          </option>
        )
      }
    } else {
      for (let i = startYear; i <= endYear; i++) {
        yearOptions.push(
          <option key={i} value={i} className={classes && classes.yearOptions ? classes.yearOptions : undefined}>
            {i}
          </option>
        )
      }
    }
    return yearOptions
  }

  generateMonthOptions() {
    const { classes, options, defaultValues } = this.props
    const { startMonth, endMonth, startYear, endYear, selectedYear } = this.state
    let months = []
    if (selectedYear === startYear) {
      for (let i = startMonth; i <= 11; i++) {
        months.push({
          value: i,
          month: monthByNumber[i],
        })
      }
    } else if (selectedYear === endYear) {
      for (let i = 0; i <= endMonth; i++) {
        months.push({
          value: i,
          month: monthByNumber[i],
        })
      }
    } else {
      for (let i = 0; i <= 11; i++) {
        months.push({
          value: i,
          month: monthByNumber[i],
        })
      }
    }

    if (options && options.monthShort) {
      months = months.map((elem) => {
        return {
          value: elem.value,
          month: elem.month.substring(0, 3),
        }
      })
    }

    if (options && options.monthCaps) {
      months = months.map((elem) => {
        return {
          value: elem.value,
          month: elem.month.toUpperCase(),
        }
      })
    }

    const monthOptions = []
    monthOptions.push(
      <option key={-1} value="-1" className={classes && classes.monthOptions ? classes.monthOptions : undefined}>
        {defaultValues && defaultValues.month ? defaultValues.month : ''}
      </option>
    )
    months.forEach((elem) => {
      monthOptions.push(
        <option key={elem.value} value={elem.value} className={classes && classes.monthOptions ? classes.monthOptions : undefined}>
          {elem.month}
        </option>
      )
    })

    return monthOptions
  }

  generateDayOptions() {
    const { classes, defaultValues } = this.props
    const { startYear, startMonth, startDay, endYear, endMonth, endDay, selectedYear, selectedMonth } = this.state
    const dayOptions = []
    dayOptions.push(
      <option key={-1} value="-1" className={classes && classes.dayOptions ? classes.dayOptions : undefined}>
        {defaultValues && defaultValues.day ? defaultValues.day : ''}
      </option>
    )

    let monthDays
    if (selectedYear === startYear) {
      if (selectedMonth === startMonth) {
        monthDays = selectedYear % 4 === 0 && selectedMonth === 1 ? daysInMonth[selectedMonth] + 1 : daysInMonth[selectedMonth]
        for (let i = startDay; i <= monthDays; i++) {
          dayOptions.push(
            <option key={i} value={i} className={classes && classes.dayOptions ? classes.dayOptions : undefined}>
              {i}
            </option>
          )
        }
      } else {
        monthDays = selectedYear % 4 === 0 && selectedMonth === 1 ? daysInMonth[selectedMonth] + 1 : daysInMonth[selectedMonth]
        for (let i = 1; i <= monthDays; i++) {
          dayOptions.push(
            <option key={i} value={i} className={classes && classes.dayOptions ? classes.dayOptions : undefined}>
              {i}
            </option>
          )
        }
      }
    } else if (selectedYear === endYear) {
      if (selectedMonth === endMonth) {
        for (let i = 1; i <= endDay; i++) {
          dayOptions.push(
            <option key={i} value={i} className={classes && classes.dayOptions ? classes.dayOptions : undefined}>
              {i}
            </option>
          )
        }
      } else {
        monthDays = selectedYear % 4 === 0 && selectedMonth === 1 ? daysInMonth[selectedMonth] + 1 : daysInMonth[selectedMonth]
        for (let i = 1; i <= monthDays; i++) {
          dayOptions.push(
            <option key={i} value={i} className={classes && classes.dayOptions ? classes.dayOptions : undefined}>
              {i}
            </option>
          )
        }
      }
    } else {
      if (selectedMonth) {
        monthDays = selectedYear % 4 === 0 && selectedMonth === 1 ? daysInMonth[selectedMonth] + 1 : daysInMonth[selectedMonth]
        for (let i = 1; i <= monthDays; i++) {
          dayOptions.push(
            <option key={i} value={i} className={classes && classes.dayOptions ? classes.dayOptions : undefined}>
              {i}
            </option>
          )
        }
      } else {
        for (let i = 1; i <= 31; i++) {
          dayOptions.push(
            <option key={i} value={i} className={classes && classes.dayOptions ? classes.dayOptions : undefined}>
              {i}
            </option>
          )
        }
      }
    }
    return dayOptions
  }

  handleDateChange = (type: DropdownComponent, value: number) => {
    if (this.props.onDateChange) {
      let { selectedYear, selectedMonth, selectedDay } = this.state
      const { endYear, endMonth, endDay } = this.state

      if (type === DropdownComponent.year) {
        selectedYear = value
      } else if (type === DropdownComponent.month) {
        selectedMonth = value
      } else if (type === DropdownComponent.day) {
        selectedDay = value
      }

      if (selectedYear === endYear) {
        if (selectedMonth > endMonth) {
          selectedMonth = endMonth
        } else if (selectedMonth === endMonth && selectedDay > endDay) {
          selectedDay = 1
        }
      }

      let _daysInMonth = daysInMonth[selectedMonth]
      if (selectedYear % 4 === 0 && selectedMonth === 1) {
        _daysInMonth++
      }

      if (selectedDay > _daysInMonth) {
        selectedDay = 1
      }

      if (selectedYear !== -1 && selectedMonth !== -1 && selectedDay !== -1) {
        this.props.onDateChange(new Date(selectedYear, selectedMonth, selectedDay))
      } else if (selectedYear !== -1 && selectedMonth !== -1) {
        this.props.onDateChange(new Date(selectedYear + '-' + monthByNumber[selectedMonth]))
      } else if (selectedYear !== -1) {
        this.setState({ selectedMonth: 1, selectedDay: 1 })
        this.props.onDateChange(new Date(selectedYear + '-01-01'))
      } else if (selectedYear === -1) {
        selectedYear = -1
        selectedMonth = -1
        selectedDay = -1
        this.setState({ selectedYear: -1, selectedMonth: -1, selectedDay: -1 })
        this.props.onDateChange(null)
      }
    }
  }

  handleYearChange = (e: any) => {
    const year = parseInt(e.target.value)
    this.setState({ selectedYear: year })
    if (this.props.onYearChange) {
      this.props.onYearChange(year)
    }
    this.handleDateChange(DropdownComponent.year, year)
  }

  handleMonthChange = (e: any) => {
    const month = parseInt(e.target.value)
    this.setState({ selectedMonth: month })
    if (this.props.onMonthChange) {
      this.props.onMonthChange(monthByNumber[month])
    }
    this.handleDateChange(DropdownComponent.month, month)
  }

  handleDayChange = (e: any) => {
    const day = parseInt(e.target.value)
    this.setState({ selectedDay: day })
    if (this.props.onDayChange) {
      this.props.onDayChange(day)
    }
    this.handleDateChange(DropdownComponent.day, day)
  }

  renderYear = () => {
    return (
      <ESSelect id="selectedYear" value={this.state.selectedYear} onChange={this.handleYearChange} fullWidth>
        {this.generateYearOptions()}
      </ESSelect>
    )
  }

  renderMonth = () => {
    return (
      <ESSelect id="selectedMonth" value={this.state.selectedMonth} onChange={this.handleMonthChange} fullWidth>
        {this.generateMonthOptions()}
      </ESSelect>
    )
  }

  renderDay = () => {
    return (
      <ESSelect id="selectedDay" value={this.state.selectedDay} onChange={this.handleDayChange} fullWidth>
        {this.generateDayOptions()}
      </ESSelect>
    )
  }

  render = () => {
    let { order } = this.props
    order = order || [DropdownComponent.year, DropdownComponent.month, DropdownComponent.day]
    return (
      <Grid container spacing={2}>
        {order.map((part, index) => {
          return (
            <Grid key={index} item xs>
              {this.renderParts[part]()}
            </Grid>
          )
        })}
      </Grid>
    )
  }
}
