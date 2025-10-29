# 第14章：实用Shell脚本案例

## 概述

本章将介绍多个实用的Shell脚本案例，涵盖系统管理、文件处理、网络应用、自动化任务等多个方面。通过这些实际案例，读者将能够将前面章节学到的Shell编程知识应用到实际场景中，解决实际问题。

每个案例都包含详细的需求分析、设计思路、实现代码和使用说明，帮助读者理解如何从需求出发，设计并实现完整的Shell脚本解决方案。

## 1 系统管理脚本

### 1.1 系统信息收集器

```bash
#!/bin/bash
# system_info_collector.sh
# 系统信息收集脚本

# 脚本配置
OUTPUT_DIR="/tmp/system_info"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
REPORT_FILE="$OUTPUT_DIR/system_report_$TIMESTAMP.txt"

# 创建输出目录
mkdir -p "$OUTPUT_DIR"

# 函数：收集系统基本信息
collect_basic_info() {
    echo "===== 系统基本信息 =====" >> "$REPORT_FILE"
    echo "主机名: $(hostname)" >> "$REPORT_FILE"
    echo "操作系统: $(uname -s)" >> "$REPORT_FILE"
    echo "内核版本: $(uname -r)" >> "$REPORT_FILE"
    echo "架构: $(uname -m)" >> "$REPORT_FILE"
    echo "运行时间: $(uptime -p)" >> "$REPORT_FILE"
    echo "当前时间: $(date)" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
}

# 函数：收集硬件信息
collect_hardware_info() {
    echo "===== 硬件信息 =====" >> "$REPORT_FILE"
    
    # CPU信息
    echo "CPU信息:" >> "$REPORT_FILE"
    if command -v lscpu >/dev/null 2>&1; then
        lscpu | grep -E "(Model name|CPU\(s\)|Thread|Core|Socket)" >> "$REPORT_FILE"
    else
        cat /proc/cpuinfo | grep -E "(model name|processor|cpu cores)" | head -10 >> "$REPORT_FILE"
    fi
    echo "" >> "$REPORT_FILE"
    
    # 内存信息
    echo "内存信息:" >> "$REPORT_FILE"
    free -h >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    
    # 磁盘信息
    echo "磁盘信息:" >> "$REPORT_FILE"
    df -h >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    
    # 网络接口信息
    echo "网络接口信息:" >> "$REPORT_FILE"
    ip addr show | grep -E "(inet|UP|DOWN)" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
}

# 函数：收集软件信息
collect_software_info() {
    echo "===== 软件信息 =====" >> "$REPORT_FILE"
    
    # 包管理器信息
    if command -v apt >/dev/null 2>&1; then
        echo "已安装的包数量: $(dpkg -l | grep '^ii' | wc -l)" >> "$REPORT_FILE"
    elif command -v yum >/dev/null 2>&1; then
        echo "已安装的包数量: $(yum list installed | wc -l)" >> "$REPORT_FILE"
    elif command -v dnf >/dev/null 2>&1; then
        echo "已安装的包数量: $(dnf list installed | wc -l)" >> "$REPORT_FILE"
    elif command -v pacman >/dev/null 2>&1; then
        echo "已安装的包数量: $(pacman -Q | wc -l)" >> "$REPORT_FILE"
    fi
    
    # 内核模块
    echo "已加载的内核模块数量: $(lsmod | wc -l)" >> "$REPORT_FILE"
    
    # 运行中的服务
    if command -v systemctl >/dev/null 2>&1; then
        echo "运行中的服务数量: $(systemctl list-units --type=service --state=running | wc -l)" >> "$REPORT_FILE"
    fi
    
    echo "" >> "$REPORT_FILE"
}

# 函数：收集性能信息
collect_performance_info() {
    echo "===== 性能信息 =====" >> "$REPORT_FILE"
    
    # CPU负载
    echo "CPU负载:" >> "$REPORT_FILE"
    uptime >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    
    # 内存使用情况
    echo "内存使用情况:" >> "$REPORT_FILE"
    free -m >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    
    # 磁盘I/O统计
    if [ -f /proc/diskstats ]; then
        echo "磁盘I/O统计:" >> "$REPORT_FILE"
        iostat -x 1 1 2>/dev/null || echo "iostat命令不可用" >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
    fi
    
    # 网络统计
    if [ -f /proc/net/dev ]; then
        echo "网络统计:" >> "$REPORT_FILE"
        cat /proc/net/dev | grep -E "(eth|en|wl|lo)" >> "$REPORT_FILE"
        echo "" >> "$REPORT_FILE"
    fi
}

# 函数：收集安全信息
collect_security_info() {
    echo "===== 安全信息 =====" >> "$REPORT_FILE"
    
    # 登录用户
    echo "当前登录用户:" >> "$REPORT_FILE"
    who >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    
    # 最近登录记录
    echo "最近登录记录:" >> "$REPORT_FILE"
    last -n 10 >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    
    # 防火墙状态
    if command -v ufw >/dev/null 2>&1; then
        echo "UFW防火墙状态:" >> "$REPORT_FILE"
        ufw status >> "$REPORT_FILE"
    elif command -v firewall-cmd >/dev/null 2>&1; then
        echo "firewalld防火墙状态:" >> "$REPORT_FILE"
        firewall-cmd --state >> "$REPORT_FILE"
    fi
    echo "" >> "$REPORT_FILE"
}

# 主函数
main() {
    echo "开始收集系统信息..."
    
    # 创建报告文件
    touch "$REPORT_FILE"
    
    # 收集各类信息
    collect_basic_info
    collect_hardware_info
    collect_software_info
    collect_performance_info
    collect_security_info
    
    echo "系统信息收集完成，报告保存在: $REPORT_FILE"
    
    # 显示报告摘要
    echo "报告摘要:"
    wc -l "$REPORT_FILE"
}

# 执行主函数
main "$@"
```

### 1.2 进程监控器

```bash
#!/bin/bash
# process_monitor.sh
# 进程监控脚本

# 配置
MONITOR_INTERVAL=5  # 监控间隔（秒）
ALERT_THRESHOLD=80  # CPU使用率告警阈值（百分比）
LOG_FILE="/var/log/process_monitor.log"
PID_FILE="/var/run/process_monitor.pid"

# 函数：获取进程CPU使用率
get_cpu_usage() {
    local pid=$1
    local cpu_usage=$(ps -p "$pid" -o %cpu --no-headers 2>/dev/null | tr -d ' ')
    echo "${cpu_usage:-0}"
}

# 函数：获取进程内存使用率
get_mem_usage() {
    local pid=$1
    local mem_usage=$(ps -p "$pid" -o %mem --no-headers 2>/dev/null | tr -d ' ')
    echo "${mem_usage:-0}"
}

# 函数：检查进程状态
check_process_status() {
    local pid=$1
    if kill -0 "$pid" 2>/dev/null; then
        echo "running"
    else
        echo "stopped"
    fi
}

# 函数：记录日志
log_message() {
    local level=$1
    shift
    local message="$*"
    local timestamp=$(date +"%Y-%m-%d %H:%M:%S")
    echo "[$timestamp] [$level] $message" >> "$LOG_FILE"
}

# 函数：发送告警
send_alert() {
    local pid=$1
    local process_name=$2
    local cpu_usage=$3
    local mem_usage=$4
    
    local message="告警: 进程 $process_name (PID: $pid) CPU使用率过高: ${cpu_usage}%"
    log_message "ALERT" "$message"
    
    # 这里可以添加其他告警方式，如邮件、短信等
    # 例如: echo "$message" | mail -s "进程监控告警" admin@example.com
}

# 函数：监控单个进程
monitor_process() {
    local pid=$1
    local process_name=$2
    
    local status=$(check_process_status "$pid")
    
    if [[ "$status" == "stopped" ]]; then
        log_message "INFO" "进程 $process_name (PID: $pid) 已停止"
        return 1
    fi
    
    local cpu_usage=$(get_cpu_usage "$pid")
    local mem_usage=$(get_mem_usage "$pid")
    
    log_message "INFO" "进程 $process_name (PID: $pid) CPU: ${cpu_usage}%, 内存: ${mem_usage}%"
    
    # 检查CPU使用率是否超过阈值
    if (( $(echo "$cpu_usage > $ALERT_THRESHOLD" | bc -l) )); then
        send_alert "$pid" "$process_name" "$cpu_usage" "$mem_usage"
    fi
    
    return 0
}

# 函数：监控所有指定进程
monitor_all_processes() {
    local pids=("$@")
    
    for pid in "${pids[@]}"; do
        local process_name=$(ps -p "$pid" -o comm= 2>/dev/null)
        if [[ -n "$process_name" ]]; then
            monitor_process "$pid" "$process_name"
        else
            log_message "ERROR" "无法找到PID为 $pid 的进程"
        fi
    done
}

# 函数：清理函数
cleanup() {
    log_message "INFO" "进程监控器停止"
    rm -f "$PID_FILE"
    exit 0
}

# 函数：显示帮助信息
show_help() {
    echo "用法: $0 [选项] PID1 [PID2 ...]"
    echo ""
    echo "选项:"
    echo "  -h, --help              显示此帮助信息"
    echo "  -i, --interval SECONDS  设置监控间隔（默认: 5秒）"
    echo "  -t, --threshold PERCENT 设置CPU使用率告警阈值（默认: 80%）"
    echo "  -l, --log FILE          设置日志文件路径（默认: /var/log/process_monitor.log）"
    echo "  -d, --daemon            以守护进程模式运行"
    echo ""
    echo "示例:"
    echo "  $0 1234 5678                    # 监控PID为1234和5678的进程"
    echo "  $0 -i 10 -t 90 1234             # 每10秒检查一次，CPU告警阈值为90%"
    echo "  $0 -d -l /tmp/monitor.log 1234  # 以守护进程模式运行，日志保存到/tmp/monitor.log"
}

# 函数：以守护进程模式运行
run_as_daemon() {
    # 检查是否已有实例在运行
    if [[ -f "$PID_FILE" ]]; then
        local existing_pid=$(cat "$PID_FILE")
        if kill -0 "$existing_pid" 2>/dev/null; then
            echo "进程监控器已在运行 (PID: $existing_pid)"
            exit 1
        else
            rm -f "$PID_FILE"
        fi
    fi
    
    # 启动守护进程
    echo "以守护进程模式启动，PID文件: $PID_FILE"
    echo $$ > "$PID_FILE"
    log_message "INFO" "进程监控器启动，PID: $$"
    
    # 设置信号处理
    trap cleanup TERM INT
    
    # 主监控循环
    while true; do
        monitor_all_processes "${pids[@]}"
        sleep "$MONITOR_INTERVAL"
    done
}

# 主函数
main() {
    # 解析命令行参数
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                show_help
                exit 0
                ;;
            -i|--interval)
                MONITOR_INTERVAL="$2"
                shift 2
                ;;
            -t|--threshold)
                ALERT_THRESHOLD="$2"
                shift 2
                ;;
            -l|--log)
                LOG_FILE="$2"
                shift 2
                ;;
            -d|--daemon)
                DAEMON_MODE=true
                shift
                ;;
            -*)
                echo "未知选项: $1"
                show_help
                exit 1
                ;;
            *)
                pids+=("$1")
                shift
                ;;
        esac
    done
    
    # 检查是否提供了PID
    if [[ ${#pids[@]} -eq 0 ]]; then
        echo "错误: 必须提供至少一个PID"
        show_help
        exit 1
    fi
    
    # 检查bc命令是否可用（用于浮点数比较）
    if ! command -v bc >/dev/null 2>&1; then
        echo "错误: 需要安装bc命令"
        exit 1
    fi
    
    # 创建日志目录
    mkdir -p "$(dirname "$LOG_FILE")"
    
    # 根据模式运行
    if [[ "$DAEMON_MODE" == "true" ]]; then
        run_as_daemon
    else
        # 前台运行一次
        log_message "INFO" "进程监控器启动"
        monitor_all_processes "${pids[@]}"
        log_message "INFO" "进程监控器完成"
    fi
}

# 初始化PID数组
declare -a pids=()

# 执行主函数
main "$@"
```

## 2 文件处理脚本

### 2.1 文件备份工具

```bash
#!/bin/bash
# file_backup.sh
# 文件备份工具

# 配置
DEFAULT_BACKUP_DIR="/backup"
DEFAULT_RETENTION_DAYS=30
DEFAULT_COMPRESSION="gzip"  # 可选: gzip, bzip2, xz, none

# 函数：显示帮助信息
show_help() {
    echo "用法: $0 [选项] <源文件或目录> [目标目录]"
    echo ""
    echo "选项:"
    echo "  -h, --help                显示此帮助信息"
    echo "  -r, --retention DAYS      设置备份保留天数（默认: 30）"
    echo "  -c, --compression TYPE    设置压缩类型（gzip, bzip2, xz, none，默认: gzip）"
    echo "  -e, --exclude PATTERN     排除匹配模式的文件"
    echo "  -i, --include PATTERN     只包含匹配模式的文件"
    echo "  -s, --schedule            设置定时备份"
    echo "  -l, --list                列出备份文件"
    echo "  -d, --delete              删除过期备份"
    echo ""
    echo "示例:"
    echo "  $0 /home/user/documents /backup"
    echo "  $0 -r 7 -c xz /var/log /backup"
    echo "  $0 -e '*.tmp' /home/user /backup"
    echo "  $0 -l /backup"
    echo "  $0 -d /backup"
}

# 函数：记录日志
log_message() {
    local level=$1
    shift
    local message="$*"
    local timestamp=$(date +"%Y-%m-%d %H:%M:%S")
    echo "[$timestamp] [$level] $message"
}

# 函数：获取压缩命令
get_compression_cmd() {
    local type=$1
    
    case $type in
        gzip)
            echo "gzip"
            ;;
        bzip2)
            echo "bzip2"
            ;;
        xz)
            echo "xz"
            ;;
        none)
            echo "cat"
            ;;
        *)
            echo "gzip"
            ;;
    esac
}

# 函数：获取压缩文件扩展名
get_compression_ext() {
    local type=$1
    
    case $type in
        gzip)
            echo ".gz"
            ;;
        bzip2)
            echo ".bz2"
            ;;
        xz)
            echo ".xz"
            ;;
        none)
            echo ""
            ;;
        *)
            echo ".gz"
            ;;
    esac
}

# 函数：创建备份
create_backup() {
    local source=$1
    local target_dir=$2
    local retention_days=$3
    local compression=$4
    local exclude_pattern=$5
    local include_pattern=$6
    
    # 检查源是否存在
    if [[ ! -e "$source" ]]; then
        log_message "ERROR" "源文件或目录不存在: $source"
        return 1
    fi
    
    # 创建目标目录
    mkdir -p "$target_dir"
    
    # 生成备份文件名
    local source_name=$(basename "$source")
    local timestamp=$(date +"%Y%m%d_%H%M%S")
    local backup_name="${source_name}_${timestamp}.tar"
    local backup_path="$target_dir/$backup_name"
    local compression_ext=$(get_compression_ext "$compression")
    local final_backup_path="${backup_path}${compression_ext}"
    
    log_message "INFO" "开始备份: $source -> $final_backup_path"
    
    # 构建tar命令
    local tar_cmd="tar"
    
    # 添加排除模式
    if [[ -n "$exclude_pattern" ]]; then
        tar_cmd="$tar_cmd --exclude='$exclude_pattern'"
    fi
    
    # 添加包含模式（需要使用--files-from）
    if [[ -n "$include_pattern" ]]; then
        local temp_file=$(mktemp)
        find "$source" -name "$include_pattern" > "$temp_file"
        tar_cmd="$tar_cmd --files-from=$temp_file"
    else
        tar_cmd="$tar_cmd -cf $backup_path -C $(dirname "$source") $(basename "$source")"
    fi
    
    # 执行备份
    if eval "$tar_cmd"; then
        log_message "INFO" "备份创建成功: $backup_path"
        
        # 压缩备份文件
        if [[ "$compression" != "none" ]]; then
            local compression_cmd=$(get_compression_cmd "$compression")
            log_message "INFO" "开始压缩备份文件..."
            
            if $compression_cmd "$backup_path"; then
                log_message "INFO" "备份压缩成功: $final_backup_path"
                rm -f "$backup_path"  # 删除未压缩的文件
            else
                log_message "ERROR" "备份压缩失败"
                return 1
            fi
        fi
        
        # 计算文件大小
        local file_size=$(du -h "$final_backup_path" | cut -f1)
        log_message "INFO" "备份完成，文件大小: $file_size"
        
        # 清理临时文件
        if [[ -n "$include_pattern" ]]; then
            rm -f "$temp_file"
        fi
        
        # 清理过期备份
        cleanup_old_backups "$target_dir" "$source_name" "$retention_days" "$compression_ext"
        
        return 0
    else
        log_message "ERROR" "备份创建失败"
        return 1
    fi
}

# 函数：清理过期备份
cleanup_old_backups() {
    local target_dir=$1
    local source_name=$2
    local retention_days=$3
    local compression_ext=$4
    
    log_message "INFO" "清理 $retention_days 天前的备份..."
    
    # 查找并删除过期备份
    find "$target_dir" -name "${source_name}_*${compression_ext}" -type f -mtime +$retention_days -print0 | while IFS= read -r -d '' file; do
        log_message "INFO" "删除过期备份: $file"
        rm -f "$file"
    done
    
    log_message "INFO" "过期备份清理完成"
}

# 函数：列出备份文件
list_backups() {
    local target_dir=$1
    
    if [[ ! -d "$target_dir" ]]; then
        log_message "ERROR" "备份目录不存在: $target_dir"
        return 1
    fi
    
    log_message "INFO" "备份目录: $target_dir"
    log_message "INFO" "备份文件列表:"
    
    # 按时间排序列出备份文件
    find "$target_dir" -name "*.tar*" -type f -printf "%T@ %p\n" | sort -n | while read timestamp file; do
        local file_size=$(du -h "$file" | cut -f1)
        local file_date=$(date -d "@${timestamp%.*}" +"%Y-%m-%d %H:%M:%S")
        echo "$file_date  $file_size  $(basename "$file")"
    done
}

# 函数：删除过期备份
delete_old_backups() {
    local target_dir=$1
    local retention_days=${2:-$DEFAULT_RETENTION_DAYS}
    
    if [[ ! -d "$target_dir" ]]; then
        log_message "ERROR" "备份目录不存在: $target_dir"
        return 1
    fi
    
    log_message "INFO" "删除 $retention_days 天前的备份..."
    
    # 查找并删除过期备份
    local deleted_count=0
    find "$target_dir" -name "*.tar*" -type f -mtime +$retention_days -print0 | while IFS= read -r -d '' file; do
        log_message "INFO" "删除过期备份: $file"
        rm -f "$file"
        ((deleted_count++))
    done
    
    log_message "INFO" "删除了 $deleted_count 个过期备份"
}

# 函数：设置定时备份
schedule_backup() {
    local source=$1
    local target_dir=$2
    local retention_days=$3
    local compression=$4
    local exclude_pattern=$5
    local include_pattern=$6
    
    # 生成cron表达式
    echo "请选择备份频率:"
    echo "1) 每天凌晨2点"
    echo "2) 每周日凌晨2点"
    echo "3) 每月1号凌晨2点"
    echo "4) 自定义"
    
    read -p "请选择 (1-4): " choice
    
    local cron_expr=""
    case $choice in
        1)
            cron_expr="0 2 * * *"
            ;;
        2)
            cron_expr="0 2 * * 0"
            ;;
        3)
            cron_expr="0 2 1 * *"
            ;;
        4)
            read -p "请输入cron表达式 (分 时 日 月 周): " cron_expr
            ;;
        *)
            log_message "ERROR" "无效的选择"
            return 1
            ;;
    esac
    
    # 生成备份命令
    local backup_cmd="$0"
    
    if [[ -n "$retention_days" ]]; then
        backup_cmd="$backup_cmd -r $retention_days"
    fi
    
    if [[ -n "$compression" ]]; then
        backup_cmd="$backup_cmd -c $compression"
    fi
    
    if [[ -n "$exclude_pattern" ]]; then
        backup_cmd="$backup_cmd -e '$exclude_pattern'"
    fi
    
    if [[ -n "$include_pattern" ]]; then
        backup_cmd="$backup_cmd -i '$include_pattern'"
    fi
    
    backup_cmd="$backup_cmd $source $target_dir"
    
    # 添加到crontab
    (crontab -l 2>/dev/null; echo "$cron_expr $backup_cmd") | crontab -
    
    log_message "INFO" "定时备份已添加到crontab"
    log_message "INFO" "cron表达式: $cron_expr"
    log_message "INFO" "备份命令: $backup_cmd"
}

# 主函数
main() {
    # 初始化变量
    local source=""
    local target_dir="$DEFAULT_BACKUP_DIR"
    local retention_days="$DEFAULT_RETENTION_DAYS"
    local compression="$DEFAULT_COMPRESSION"
    local exclude_pattern=""
    local include_pattern=""
    local list_mode=false
    local delete_mode=false
    local schedule_mode=false
    
    # 解析命令行参数
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                show_help
                exit 0
                ;;
            -r|--retention)
                retention_days="$2"
                shift 2
                ;;
            -c|--compression)
                compression="$2"
                shift 2
                ;;
            -e|--exclude)
                exclude_pattern="$2"
                shift 2
                ;;
            -i|--include)
                include_pattern="$2"
                shift 2
                ;;
            -s|--schedule)
                schedule_mode=true
                shift
                ;;
            -l|--list)
                list_mode=true
                shift
                ;;
            -d|--delete)
                delete_mode=true
                shift
                ;;
            -*)
                log_message "ERROR" "未知选项: $1"
                show_help
                exit 1
                ;;
            *)
                if [[ -z "$source" ]]; then
                    source="$1"
                elif [[ -z "$target_dir" ]]; then
                    target_dir="$1"
                else
                    log_message "ERROR" "多余的参数: $1"
                    show_help
                    exit 1
                fi
                shift
                ;;
        esac
    done
    
    # 检查模式
    if [[ "$list_mode" == "true" ]]; then
        list_backups "$target_dir"
        exit 0
    fi
    
    if [[ "$delete_mode" == "true" ]]; then
        delete_old_backups "$target_dir" "$retention_days"
        exit 0
    fi
    
    # 检查源参数
    if [[ -z "$source" ]]; then
        log_message "ERROR" "必须指定源文件或目录"
        show_help
        exit 1
    fi
    
    # 检查压缩类型
    case $compression in
        gzip|bzip2|xz|none)
            ;;
        *)
            log_message "ERROR" "无效的压缩类型: $compression"
            show_help
            exit 1
            ;;
    esac
    
    # 检查命令是否可用
    if [[ "$compression" != "none" ]] && ! command -v "$compression" >/dev/null 2>&1; then
        log_message "ERROR" "压缩命令不可用: $compression"
        exit 1
    fi
    
    # 执行相应操作
    if [[ "$schedule_mode" == "true" ]]; then
        schedule_backup "$source" "$target_dir" "$retention_days" "$compression" "$exclude_pattern" "$include_pattern"
    else
        create_backup "$source" "$target_dir" "$retention_days" "$compression" "$exclude_pattern" "$include_pattern"
    fi
}

# 执行主函数
main "$@"
```

## 3 网络应用脚本

### 3.1 网络连接监控器

```bash
#!/bin/bash
# network_monitor.sh
# 网络连接监控脚本

# 配置
DEFAULT_INTERVAL=30  # 监控间隔（秒）
DEFAULT_TIMEOUT=5   # 连接超时（秒）
DEFAULT_LOG_FILE="/var/log/network_monitor.log"
DEFAULT_PID_FILE="/var/run/network_monitor.pid"

# 函数：显示帮助信息
show_help() {
    echo "用法: $0 [选项] [主机1:端口1] [主机2:端口2] ..."
    echo ""
    echo "选项:"
    echo "  -h, --help              显示此帮助信息"
    echo "  -i, --interval SECONDS  设置监控间隔（默认: 30秒）"
    echo "  -t, --timeout SECONDS   设置连接超时（默认: 5秒）"
    echo "  -l, --log FILE          设置日志文件路径（默认: /var/log/network_monitor.log）"
    echo "  -d, --daemon            以守护进程模式运行"
    echo "  -f, --config FILE       从配置文件读取主机列表"
    echo "  -s, --status            显示当前监控状态"
    echo "  -k, --kill              停止监控进程"
    echo ""
    echo "示例:"
    echo "  $0 google.com:80 github.com:443"
    echo "  $0 -i 10 -t 3 192.168.1.1:22 192.168.1.2:80"
    echo "  $0 -f hosts.conf"
    echo "  $0 -s"
    echo "  $0 -k"
}

# 函数：记录日志
log_message() {
    local level=$1
    shift
    local message="$*"
    local timestamp=$(date +"%Y-%m-%d %H:%M:%S")
    echo "[$timestamp] [$level] $message" >> "$LOG_FILE"
    
    # 如果不是守护进程模式，也输出到控制台
    if [[ "$DAEMON_MODE" != "true" ]]; then
        echo "[$timestamp] [$level] $message"
    fi
}

# 函数：检查网络连接
check_connection() {
    local host=$1
    local port=$2
    local timeout=$3
    
    # 使用nc或telnet检查连接
    if command -v nc >/dev/null 2>&1; then
        nc -z -w "$timeout" "$host" "$port" >/dev/null 2>&1
    elif command -v telnet >/dev/null 2>&1; then
        timeout "$timeout" telnet "$host" "$port" </dev/null >/dev/null 2>&1
    else
        log_message "ERROR" "需要安装nc或telnet命令"
        return 2
    fi
    
    return $?
}

# 函数：监控单个主机
monitor_host() {
    local host_port=$1
    local timeout=$2
    
    # 解析主机和端口
    local host=$(echo "$host_port" | cut -d: -f1)
    local port=$(echo "$host_port" | cut -d: -f2)
    
    # 检查连接
    if check_connection "$host" "$port" "$timeout"; then
        log_message "INFO" "连接成功: $host:$port"
        return 0
    else
        log_message "ERROR" "连接失败: $host:$port"
        return 1
    fi
}

# 函数：监控所有主机
monitor_all_hosts() {
    local hosts=("$@")
    local success_count=0
    local failure_count=0
    
    log_message "INFO" "开始监控 ${#hosts[@]} 个主机"
    
    for host_port in "${hosts[@]}"; do
        if monitor_host "$host_port" "$TIMEOUT"; then
            ((success_count++))
        else
            ((failure_count++))
        fi
    done
    
    log_message "INFO" "监控完成: 成功 $success_count，失败 $failure_count"
    
    return $failure_count
}

# 函数：读取配置文件
read_config() {
    local config_file=$1
    local hosts=()
    
    if [[ ! -f "$config_file" ]]; then
        log_message "ERROR" "配置文件不存在: $config_file"
        return 1
    fi
    
    # 读取配置文件，每行一个主机:端口
    while IFS= read -r line; do
        # 跳过空行和注释行
        [[ -z "$line" || "$line" =~ ^# ]] && continue
        
        # 检查格式是否正确
        if [[ "$line" =~ ^[^:]+:[0-9]+$ ]]; then
            hosts+=("$line")
        else
            log_message "ERROR" "无效的主机格式: $line"
        fi
    done < "$config_file"
    
    echo "${hosts[@]}"
}

# 函数：显示监控状态
show_status() {
    if [[ -f "$PID_FILE" ]]; then
        local pid=$(cat "$PID_FILE")
        if kill -0 "$pid" 2>/dev/null; then
            echo "网络监控器正在运行 (PID: $pid)"
            echo "日志文件: $LOG_FILE"
            echo "监控间隔: ${INTERVAL}秒"
            echo "连接超时: ${TIMEOUT}秒"
            
            # 显示最近的日志
            echo ""
            echo "最近的日志记录:"
            tail -n 10 "$LOG_FILE"
        else
            echo "网络监控器未运行"
            rm -f "$PID_FILE"
        fi
    else
        echo "网络监控器未运行"
    fi
}

# 函数：停止监控进程
stop_monitor() {
    if [[ -f "$PID_FILE" ]]; then
        local pid=$(cat "$PID_FILE")
        if kill -0 "$pid" 2>/dev/null; then
            echo "停止网络监控器 (PID: $pid)"
            kill "$pid"
            sleep 1
            
            # 如果进程仍在运行，强制终止
            if kill -0 "$pid" 2>/dev/null; then
                kill -9 "$pid"
            fi
            
            log_message "INFO" "网络监控器已停止"
        else
            echo "网络监控器未运行"
        fi
        
        rm -f "$PID_FILE"
    else
        echo "网络监控器未运行"
    fi
}

# 函数：清理函数
cleanup() {
    log_message "INFO" "网络监控器停止"
    rm -f "$PID_FILE"
    exit 0
}

# 函数：以守护进程模式运行
run_as_daemon() {
    local hosts=("$@")
    
    # 检查是否已有实例在运行
    if [[ -f "$PID_FILE" ]]; then
        local existing_pid=$(cat "$PID_FILE")
        if kill -0 "$existing_pid" 2>/dev/null; then
            echo "网络监控器已在运行 (PID: $existing_pid)"
            exit 1
        else
            rm -f "$PID_FILE"
        fi
    fi
    
    # 启动守护进程
    echo "以守护进程模式启动，PID文件: $PID_FILE"
    echo $$ > "$PID_FILE"
    log_message "INFO" "网络监控器启动，PID: $$"
    log_message "INFO" "监控主机: ${hosts[*]}"
    log_message "INFO" "监控间隔: ${INTERVAL}秒"
    log_message "INFO" "连接超时: ${TIMEOUT}秒"
    
    # 设置信号处理
    trap cleanup TERM INT
    
    # 主监控循环
    while true; do
        monitor_all_hosts "${hosts[@]}"
        sleep "$INTERVAL"
    done
}

# 主函数
main() {
    # 初始化变量
    local config_file=""
    local status_mode=false
    local kill_mode=false
    local daemon_mode=false
    local hosts=()
    
    # 解析命令行参数
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                show_help
                exit 0
                ;;
            -i|--interval)
                INTERVAL="$2"
                shift 2
                ;;
            -t|--timeout)
                TIMEOUT="$2"
                shift 2
                ;;
            -l|--log)
                LOG_FILE="$2"
                shift 2
                ;;
            -d|--daemon)
                daemon_mode=true
                shift
                ;;
            -f|--config)
                config_file="$2"
                shift 2
                ;;
            -s|--status)
                status_mode=true
                shift
                ;;
            -k|--kill)
                kill_mode=true
                shift
                ;;
            -*)
                echo "未知选项: $1"
                show_help
                exit 1
                ;;
            *)
                hosts+=("$1")
                shift
                ;;
        esac
    done
    
    # 处理特殊模式
    if [[ "$status_mode" == "true" ]]; then
        show_status
        exit 0
    fi
    
    if [[ "$kill_mode" == "true" ]]; then
        stop_monitor
        exit 0
    fi
    
    # 从配置文件读取主机列表
    if [[ -n "$config_file" ]]; then
        local config_hosts=($(read_config "$config_file"))
        hosts+=("${config_hosts[@]}")
    fi
    
    # 检查是否提供了主机
    if [[ ${#hosts[@]} -eq 0 ]]; then
        echo "错误: 必须提供至少一个主机或配置文件"
        show_help
        exit 1
    fi
    
    # 创建日志目录
    mkdir -p "$(dirname "$LOG_FILE")"
    
    # 根据模式运行
    if [[ "$daemon_mode" == "true" ]]; then
        DAEMON_MODE=true
        run_as_daemon "${hosts[@]}"
    else
        # 前台运行一次
        log_message "INFO" "网络监控器启动"
        monitor_all_hosts "${hosts[@]}"
        log_message "INFO" "网络监控器完成"
    fi
}

# 设置默认值
INTERVAL=${INTERVAL:-$DEFAULT_INTERVAL}
TIMEOUT=${TIMEOUT:-$DEFAULT_TIMEOUT}
LOG_FILE=${LOG_FILE:-$DEFAULT_LOG_FILE}
PID_FILE=${PID_FILE:-$DEFAULT_PID_FILE}
DAEMON_MODE=false

# 执行主函数
main "$@"
```

## 4 自动化任务脚本

### 4.1 系统维护自动化

```bash
#!/bin/bash
# system_maintenance.sh
# 系统维护自动化脚本

# 配置
DEFAULT_LOG_FILE="/var/log/system_maintenance.log"
DEFAULT_CONFIG_FILE="/etc/system_maintenance.conf"

# 函数：显示帮助信息
show_help() {
    echo "用法: $0 [选项]"
    echo ""
    echo "选项:"
    echo "  -h, --help              显示此帮助信息"
    echo "  -c, --config FILE       指定配置文件（默认: /etc/system_maintenance.conf）"
    echo "  -l, --log FILE          指定日志文件（默认: /var/log/system_maintenance.log）"
    echo "  -t, --task TASK         执行特定任务（clean, update, backup, check）"
    echo "  -s, --schedule          设置定时任务"
    echo "  -v, --verbose           详细输出模式"
    echo "  -q, --quiet             静默模式"
    echo ""
    echo "任务说明:"
    echo "  clean    清理系统临时文件和日志"
    echo "  update   更新系统软件包"
    echo "  backup   备份重要系统文件"
    echo "  check    检查系统健康状态"
    echo ""
    echo "示例:"
    echo "  $0                           # 执行所有维护任务"
    echo "  $0 -t clean                  # 只执行清理任务"
    echo "  $0 -s                        # 设置定时任务"
}

# 函数：记录日志
log_message() {
    local level=$1
    shift
    local message="$*"
    local timestamp=$(date +"%Y-%m-%d %H:%M:%S")
    
    # 写入日志文件
    echo "[$timestamp] [$level] $message" >> "$LOG_FILE"
    
    # 如果不是静默模式，也输出到控制台
    if [[ "$QUIET_MODE" != "true" ]]; then
        echo "[$timestamp] [$level] $message"
    fi
}

# 函数：读取配置文件
read_config() {
    local config_file=$1
    
    if [[ ! -f "$config_file" ]]; then
        log_message "ERROR" "配置文件不存在: $config_file"
        return 1
    fi
    
    # 读取配置文件
    source "$config_file"
    
    # 设置默认值
    CLEAN_TEMP_DIRS=${CLEAN_TEMP_DIRS:-"/tmp /var/tmp"}
    CLEAN_LOG_DAYS=${CLEAN_LOG_DAYS:-7}
    UPDATE_AUTO=${UPDATE_AUTO:-false}
    BACKUP_DIRS=${BACKUP_DIRS:-"/etc /home /var/www"}
    BACKUP_DEST=${BACKUP_DEST:-"/backup"}
    CHECK_DISK_THRESHOLD=${CHECK_DISK_THRESHOLD:-80}
    CHECK_MEMORY_THRESHOLD=${CHECK_MEMORY_THRESHOLD:-80}
    
    log_message "INFO" "配置文件加载成功: $config_file"
}

# 函数：清理系统临时文件
clean_system() {
    log_message "INFO" "开始清理系统临时文件"
    
    # 清理临时目录
    for dir in $CLEAN_TEMP_DIRS; do
        if [[ -d "$dir" ]]; then
            log_message "INFO" "清理目录: $dir"
            find "$dir" -type f -atime +7 -delete 2>/dev/null
        fi
    done
    
    # 清理日志文件
    log_message "INFO" "清理 $CLEAN_LOG_DAYS 天前的日志文件"
    find /var/log -name "*.log" -type f -mtime +$CLEAN_LOG_DAYS -delete 2>/dev/null
    
    # 清理包管理器缓存
    if command -v apt >/dev/null 2>&1; then
        log_message "INFO" "清理APT缓存"
        apt-get clean >/dev/null 2>&1
    elif command -v yum >/dev/null 2>&1; then
        log_message "INFO" "清理YUM缓存"
        yum clean all >/dev/null 2>&1
    elif command -v dnf >/dev/null 2>&1; then
        log_message "INFO" "清理DNF缓存"
        dnf clean all >/dev/null 2>&1
    fi
    
    log_message "INFO" "系统清理完成"
}

# 函数：更新系统软件包
update_system() {
    log_message "INFO" "开始更新系统软件包"
    
    if [[ "$UPDATE_AUTO" != "true" ]]; then
        log_message "INFO" "自动更新已禁用，跳过更新"
        return 0
    fi
    
    if command -v apt >/dev/null 2>&1; then
        log_message "INFO" "更新APT软件包列表"
        apt-get update >/dev/null 2>&1
        
        log_message "INFO" "升级系统软件包"
        DEBIAN_FRONTEND=noninteractive apt-get upgrade -y >/dev/null 2>&1
        
        log_message "INFO" "清理不需要的软件包"
        DEBIAN_FRONTEND=noninteractive apt-get autoremove -y >/dev/null 2>&1
    elif command -v yum >/dev/null 2>&1; then
        log_message "INFO" "更新YUM软件包"
        yum update -y >/dev/null 2>&1
        
        log_message "INFO" "清理不需要的软件包"
        yum autoremove -y >/dev/null 2>&1
    elif command -v dnf >/dev/null 2>&1; then
        log_message "INFO" "更新DNF软件包"
        dnf update -y >/dev/null 2>&1
        
        log_message "INFO" "清理不需要的软件包"
        dnf autoremove -y >/dev/null 2>&1
    else
        log_message "ERROR" "未找到支持的包管理器"
        return 1
    fi
    
    log_message "INFO" "系统更新完成"
}

# 函数：备份重要系统文件
backup_system() {
    log_message "INFO" "开始备份系统文件"
    
    # 创建备份目录
    local backup_dir="$BACKUP_DEST/$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$backup_dir"
    
    # 备份指定目录
    for dir in $BACKUP_DIRS; do
        if [[ -d "$dir" ]]; then
            log_message "INFO" "备份目录: $dir"
            local dir_name=$(basename "$dir")
            tar -czf "$backup_dir/${dir_name}.tar.gz" -C "$(dirname "$dir")" "$(basename "$dir")" 2>/dev/null
        fi
    done
    
    # 备份系统配置文件
    log_message "INFO" "备份系统配置文件"
    tar -czf "$backup_dir/system_configs.tar.gz" /etc/passwd /etc/group /etc/shadow /etc/gshadow /etc/fstab /etc/hosts 2>/dev/null
    
    # 备份已安装的软件包列表
    if command -v apt >/dev/null 2>&1; then
        dpkg --get-selections > "$backup_dir/installed_packages.txt" 2>/dev/null
    elif command -v yum >/dev/null 2>&1; then
        yum list installed > "$backup_dir/installed_packages.txt" 2>/dev/null
    elif command -v dnf >/dev/null 2>&1; then
        dnf list installed > "$backup_dir/installed_packages.txt" 2>/dev/null
    fi
    
    log_message "INFO" "系统备份完成，备份目录: $backup_dir"
}

# 函数：检查系统健康状态
check_system_health() {
    log_message "INFO" "开始检查系统健康状态"
    
    # 检查磁盘使用率
    log_message "INFO" "检查磁盘使用率"
    local disk_issues=0
    df -h | grep -vE '^Filesystem|tmpfs|cdrom' | while read filesystem size used avail use_percent mount; do
        local usage=$(echo "$use_percent" | sed 's/%//')
        if [[ $usage -gt $CHECK_DISK_THRESHOLD ]]; then
            log_message "WARNING" "磁盘 $filesystem 使用率过高: $use_percent"
            ((disk_issues++))
        fi
    done
    
    # 检查内存使用率
    log_message "INFO" "检查内存使用率"
    local mem_usage=$(free | grep Mem | awk '{printf("%.0f", $3/$2 * 100.0)}')
    if [[ $mem_usage -gt $CHECK_MEMORY_THRESHOLD ]]; then
        log_message "WARNING" "内存使用率过高: $mem_usage%"
    fi
    
    # 检查系统负载
    log_message "INFO" "检查系统负载"
    local load_avg=$(uptime | awk -F'load average:' '{print $2}' | awk '{print $1}' | sed 's/,//')
    local cpu_cores=$(nproc)
    local load_threshold=$((cpu_cores * 80 / 100))
    
    if (( $(echo "$load_avg > $load_threshold" | bc -l) )); then
        log_message "WARNING" "系统负载过高: $load_avg (CPU核心数: $cpu_cores)"
    fi
    
    # 检查网络连接
    log_message "INFO" "检查网络连接"
    if ping -c 1 8.8.8.8 >/dev/null 2>&1; then
        log_message "INFO" "网络连接正常"
    else
        log_message "WARNING" "网络连接异常"
    fi
    
    # 检查关键服务状态
    log_message "INFO" "检查关键服务状态"
    if command -v systemctl >/dev/null 2>&1; then
        local services=("sshd" "cron" "network")
        for service in "${services[@]}"; do
            if systemctl is-active --quiet "$service"; then
                log_message "INFO" "服务 $service 运行正常"
            else
                log_message "WARNING" "服务 $service 未运行"
            fi
        done
    fi
    
    log_message "INFO" "系统健康检查完成"
}

# 函数：设置定时任务
schedule_maintenance() {
    log_message "INFO" "设置系统维护定时任务"
    
    # 生成cron表达式
    echo "请选择维护频率:"
    echo "1) 每天凌晨3点"
    echo "2) 每周日凌晨3点"
    echo "3) 每月1号凌晨3点"
    echo "4) 自定义"
    
    read -p "请选择 (1-4): " choice
    
    local cron_expr=""
    case $choice in
        1)
            cron_expr="0 3 * * *"
            ;;
        2)
            cron_expr="0 3 * * 0"
            ;;
        3)
            cron_expr="0 3 1 * *"
            ;;
        4)
            read -p "请输入cron表达式 (分 时 日 月 周): " cron_expr
            ;;
        *)
            log_message "ERROR" "无效的选择"
            return 1
            ;;
    esac
    
    # 生成维护命令
    local maintenance_cmd="$0"
    
    if [[ -n "$CONFIG_FILE" ]]; then
        maintenance_cmd="$maintenance_cmd -c $CONFIG_FILE"
    fi
    
    if [[ -n "$LOG_FILE" ]]; then
        maintenance_cmd="$maintenance_cmd -l $LOG_FILE"
    fi
    
    # 添加到crontab
    (crontab -l 2>/dev/null; echo "$cron_expr $maintenance_cmd") | crontab -
    
    log_message "INFO" "定时维护已添加到crontab"
    log_message "INFO" "cron表达式: $cron_expr"
    log_message "INFO" "维护命令: $maintenance_cmd"
}

# 主函数
main() {
    # 初始化变量
    local config_file="$DEFAULT_CONFIG_FILE"
    local log_file="$DEFAULT_LOG_FILE"
    local task=""
    local schedule_mode=false
    local verbose_mode=false
    local quiet_mode=false
    
    # 解析命令行参数
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                show_help
                exit 0
                ;;
            -c|--config)
                config_file="$2"
                shift 2
                ;;
            -l|--log)
                log_file="$2"
                shift 2
                ;;
            -t|--task)
                task="$2"
                shift 2
                ;;
            -s|--schedule)
                schedule_mode=true
                shift
                ;;
            -v|--verbose)
                verbose_mode=true
                shift
                ;;
            -q|--quiet)
                quiet_mode=true
                shift
                ;;
            -*)
                echo "未知选项: $1"
                show_help
                exit 1
                ;;
            *)
                echo "多余的参数: $1"
                show_help
                exit 1
                ;;
        esac
    done
    
    # 设置全局变量
    LOG_FILE="$log_file"
    QUIET_MODE="$quiet_mode"
    
    # 创建日志目录
    mkdir -p "$(dirname "$LOG_FILE")"
    
    # 读取配置文件
    read_config "$config_file"
    
    # 处理定时任务模式
    if [[ "$schedule_mode" == "true" ]]; then
        schedule_maintenance
        exit 0
    fi
    
    # 记录开始
    log_message "INFO" "系统维护开始"
    
    # 根据任务执行相应操作
    case $task in
        clean)
            clean_system
            ;;
        update)
            update_system
            ;;
        backup)
            backup_system
            ;;
        check)
            check_system_health
            ;;
        "")
            # 执行所有任务
            clean_system
            update_system
            backup_system
            check_system_health
            ;;
        *)
            echo "未知任务: $task"
            show_help
            exit 1
            ;;
    esac
    
    # 记录结束
    log_message "INFO" "系统维护完成"
}

# 执行主函数
main "$@"
```

## 5 实践练习

### 5.1 创建系统资源监控脚本

编写一个Shell脚本，用于监控系统的CPU、内存、磁盘和网络使用情况，并在资源使用超过阈值时发送告警。

### 5.2 开发日志轮转工具

创建一个日志轮转工具，可以自动压缩、归档和删除旧的日志文件，支持自定义保留策略和压缩格式。

### 5.3 实现自动化部署脚本

编写一个自动化部署脚本，可以从源代码仓库拉取最新代码，编译项目，并重启相关服务。

### 5.4 构建批量文件处理工具

开发一个批量文件处理工具，可以批量重命名、转换格式或修改文件属性，支持递归目录处理和文件过滤。

## 6 总结

本章介绍了多个实用的Shell脚本案例，涵盖了系统管理、文件处理、网络应用和自动化任务等多个方面。通过这些案例，读者可以学习到：

1. 如何设计结构化的Shell脚本
2. 如何处理命令行参数和配置文件
3. 如何实现日志记录和错误处理
4. 如何编写守护进程和后台任务
5. 如何与其他系统工具和服务集成

这些脚本案例不仅提供了实用的解决方案，也展示了Shell编程的强大功能和灵活性。读者可以根据自己的需求修改和扩展这些脚本，或者参考这些脚本的设计思路来开发自己的解决方案。

在下一章中，我们将学习Linux安全基础，包括用户权限管理、文件系统安全、网络安全等内容。