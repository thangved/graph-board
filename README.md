# graph-board

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/169db8d768b14550ac1cdf5edbcd2999)](https://app.codacy.com/gh/thangved/graph-board?utm_source=github.com&utm_medium=referral&utm_content=thangved/graph-board&utm_campaign=Badge_Grade_Settings)

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

| Tham số      | Kiểu dữ liệu | Mặc định | Mô tả                                 |
|--------------|--------------|----------|---------------------------------------|
| directed     | boolean      | false    | Tùy chọn đồ thị có hướng hay vô hướng |
| showGrid     | boolean      | false    | Tùy chọn hiện hay ẩn lưới             |
| showDistance | boolean      | false    | Hiển thị khoảng các giữa các đỉnh     |
| radius       | number       | 20       | Bán kính của đỉnh                     |

### Ví dụ

> Example

```js
...

const options = {
    directed: true,
    showGrid: true,
    showDistance: true,
    radius: 35,
}

const graph = new Graph(options)
graph.appendTo('#graph')

...
```

## Thuộc tính

> Properties

| Tên thuộc tính | Giá trị                                                 | Cấu trúc                                            |
|----------------|---------------------------------------------------------|-----------------------------------------------------|
| nodes          | Danh sách chứa các đỉnh và vị trí của nó trên hệ tọa độ | ```nodes```: {label:number, x: number, y: number}[] |
| edges          | Danh sách các cung của đồ thị                           | ```edges```: {from:number, to: number}[]            |

## Phương thức

> Methods

| Tên phương thức                      | Tham số                                                             | Mô tả                                                      |
|--------------------------------------|---------------------------------------------------------------------|------------------------------------------------------------|
| addNode(label:number)                | ```label```: nhãn của nút                                           | Thêm một nút vào đồ thị                                    |
| addEdge(from:number, to:number)      | ```from```: đỉnh bắt đầu của cung, ```to```: đỉnh kết thúc của cung | Thêm một cung vào đồ thị                                   |
| appendTo(selector: string)           | ```selector```: css-selector                                        | Chèn giao diện đồ họa của đồ thị vào một đối tượng DOM     |
| setRedirected(directed: boolean)     | ```directed```: boolean                                             | Đặt giá trị cho việc hiện hay ẩn hướng của đồ thị          |
| setShowDistance(distance: boolean)   | ```distance```: boolean                                             | Đặt giá trị cho việc hiện hay ẩn khoảng cách giữa các đỉnh |
| setShowGrid(showGrid: boolean)       | ```showGrid```: boolean                                             | Đặt giá trị cho việc hiện hay ẩn lưới                      |
| exportMatrix(): number[][]           | Không có tham số                                                    | Trả về ma trận  kề của đồ thị                              |
| removeNode(label:number)             | ```label```: nhãn                                                   | Xóa một nút có nhãn ```label```                            |
| removeEdge(from: number, to: number) | ```from```: đỉnh bắt đầu của cung, ```to```: đỉnh kết thúc của cung | Xóa một cung khỏi đồ thị                                   |

## Donation

<a href='https://www.paypal.com/paypalme/minhthangpay'>
    <img title='paypal' width='30px' src='https://raw.githubusercontent.com/thangved/docusaurus-plugin-2dlive/main/assets/paypal-3384015_1280.png'/>
</a>
