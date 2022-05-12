const styles = {
  text: {
    fontSize: '12px',
    lineHeight: '14px',
    fontWeight: '500',
    color: 'text',
    marginLeft: '-5px',
  },
  title: {
    fontSize: '16px',
    margin: '20px 0px 8px 8px',
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    margin: '10px 15px 30px',
    alignItems: 'center',
  },
  roiContainer: {
    backgroundColor: 'brown',
    borderRadius: '20px',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '17px 0',
    marginBottom: '25px',
    columnGap: '20px',
  },
  roiBanana: {
    '& span': {
      fontSize: '12px',
    },
  },
  detailRow: {
    marginBottom: '5px',
    fontSize: '16px',
    fontWeight: '700',
    justifyContent: 'space-between',
    paddingBottom: '5px',
  },
  detailContainer: (hide) => ({
    backgroundColor: 'white3',
    padding: hide ? 0 : '30px 20px',
    borderRadius: '10px',
    overflow: hide ? 'hidden' : 'visible',
    height: hide ? 0 : 'auto',
    '& span': {
      fontSize: '12px',
    },
  }),
}
export default styles
