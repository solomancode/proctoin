import { ReactNode } from "react";
import { List } from "react-virtualized";

interface Props<T> {
  list: T[]
  renderItem: (item: T) => ReactNode
  width: number
  height: number
  itemHeight: number
}

export function VirtualList<T>(props: Props<T>) {

  const rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) => {
    return (
      <section key={key} style={style}>
        {props.renderItem(props.list[index])}
      </section>
    );
  }

  return (
  <List
    width={props.width}
    height={props.height}
    rowCount={props.list.length}
    rowHeight={props.itemHeight}
    rowRenderer={rowRenderer}
  />
  )
}
