# graph-board

Một Thư Viện Vẽ Đồ Thị Bằng Javascript.
> A Draw Graph Javascript Library.

[Xem demo](https://thangved.github.io/draw-graph)

## Cách dùng cơ bản

> Basic Usage

```index.html```

```html
...
<div id="graph">

</div>
...
```

```js
import Graph from 'graph-board'

// Khởi tạo đối tượng Graph
const graph = new Graph()

// Mount đồ thị vào một phần tử
graph.appendTo('#graph')
```

## Tùy chọn

> Options

Bạn có thêm một số tham số khi khởi tạo đồi tượng

| Tham số      | Kiểu dữ liệu | Mô tả                                 |
|--------------|--------------|---------------------------------------|
| directed     | boolean      | Tùy chọn đồ thị có hướng hay vô hướng |
| showGrid     | boolean      | Tùy chọn hiện hay ẩn lưới             |
| showDistance | boolean      | Hiển thị khoảng các giữa các đỉnh     |

## Phương thức

> Methods

| Tên phương thức                    | Tham số                                                             | Mô tả                                                      |
|------------------------------------|---------------------------------------------------------------------|------------------------------------------------------------|
| addNode(label:number)              | ```label```: nhãn của nút                                           | Thêm một nút vào đồ thị                                    |
| addEdge(from:number, to:number)    | ```from```: đỉnh bắt đầu của cung, ```to```: đỉnh kết thúc của cung | Thêm một cung vào đồ thị                                   |
| appendTo(selector: string)         | ```selector```: css-selector                                        | Chèn giao diện đồ họa của đồ thị vào một đối tượng DOM     |
| setRedirected(directed: boolean)   | ```directed```: boolean                                             | Đặt giá trị cho việc hiện hay ẩn hướng của đồ thị          |
| setShowDistance(distance: boolean) | ```distance```: boolean                                             | Đặt giá trị cho việc hiện hay ẩn khoảng cách giữa các đỉnh |
| setShowGrid(showGrid: boolean)     | ```showGrid```: boolean                                             | Đặt giá trị cho việc hiện hay ẩn lưới                      |

## Donation

<a href='https://www.paypal.com/paypalme/minhthangpay'>
    <img title='paypal' width='30px' src='https://raw.githubusercontent.com/thangved/docusaurus-plugin-2dlive/main/assets/paypal-3384015_1280.png'/>
</a>
