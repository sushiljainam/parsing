# parsing
parsing my expense written as Short Messages (String) using jison


## Converts

"30/06/2016, 6:58 PM - sushil kumar jain: Ex. Riksha 10, bus 23, auto 30, paratha canteen 15"

to

{ meta: { at: { date: '30/06/2016', time: '6:58 PM' },
    by: 'sushil kumar jain' },
  trans: { type: 'EXPENSE',
    entries: [
      { amount: '10', title: 'Riksha' },
      { amount: '23', title: 'bus' },
      { amount: '30', title: 'auto' },
      { amount: '15', title: 'paratha canteen' }
    ] }
}