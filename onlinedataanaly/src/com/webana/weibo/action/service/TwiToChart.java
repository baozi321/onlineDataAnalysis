package com.webana.weibo.action.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.webana.weibo.action.model.PieChart;
import com.webana.weibo.action.model.Tweet;
import com.webana.weibo.action.model.TwiUsers;

/**
 * 
 * @author Andrew
 * 
 */

public class TwiToChart {
	
	private static final Logger logger = LoggerFactory.getLogger(TwiToChart.class);

	public static String[] COLOR = {"#a5c2d5", "#cbab4f", "#76a871"};

    private TreeMap<String, Integer> userTypeMap = new TreeMap<String, Integer>();
    
    private TreeMap<String, Integer> genderMap = new TreeMap<String, Integer>();
    
    private TreeMap<String, Integer> locationMap = new TreeMap<String, Integer>();

    Tweet twi;
    public TwiToChart(Tweet twi) {
    	this.twi = twi;
    }
    
    public void analysis() {
    	for(TwiUsers user : twi.getUsers()) {
    		userTypeMap.put(user.getUserType(), userTypeMap.containsKey(user.getUserType())? (userTypeMap.get(user.getUserType()) + 1) : 1);
    		genderMap.put(user.getGender(), genderMap.containsKey(user.getGender())? (genderMap.get(user.getGender()) + 1) : 1);
    		String location1 = user.getGender()!=null?user.getLocation().split(" ")[0]:user.getLocation();
    		locationMap.put(location1, locationMap.containsKey(location1)? (locationMap.get(location1) + 1) : 1);
    	}
    }
    
    @SuppressWarnings({ "rawtypes", "unchecked" })
	public List<PieChart> getUserTypeChart() {
    	Comparator c = new ValueComparator();
		List arrayList = new ArrayList(userTypeMap.entrySet());
        Collections.sort(arrayList, c);
        List<PieChart> chartdatas = new ArrayList<PieChart>();
        for (int i = 0; i < arrayList.size(); i++) {
        	String name = ((Map.Entry) arrayList.get(i)).getKey().toString();
        	int value = (Integer)(((Map.Entry) arrayList.get(i)).getValue());
        	PieChart chart = new PieChart(name, value, COLOR[i]);
        	chartdatas.add(chart);
        }
        return chartdatas;
    }
    
    @SuppressWarnings({ "rawtypes", "unchecked" })
	public List<PieChart> getRepostRatioChart() {    	
        List<PieChart> chartdatas = new ArrayList<PieChart>();        
    	chartdatas.add(new PieChart("转发", twi.getRepostCount(), COLOR[0]));
    	chartdatas.add(new PieChart("评论", twi.getCommentCount(), COLOR[1]));
        return chartdatas;
    }
    
    @SuppressWarnings({ "rawtypes", "unchecked" })
	public List<PieChart> getUserGenderChart() {
    	Comparator c = new ValueComparator();
		List arrayList = new ArrayList(genderMap.entrySet());
        Collections.sort(arrayList, c);
        List<PieChart> chartdatas = new ArrayList<PieChart>();
        for (int i = 0; i < arrayList.size(); i++) {
        	String name = ((Map.Entry) arrayList.get(i)).getKey().toString();
        	int value = (Integer)(((Map.Entry) arrayList.get(i)).getValue());
        	PieChart chart = new PieChart(name.equals("m")?"男":"女", value, COLOR[i]);
        	chartdatas.add(chart);
        }
        return chartdatas;
    }
    
    @SuppressWarnings({ "rawtypes", "unchecked" })
	public List<PieChart> getUserLocationChart() {
    	Comparator c = new ValueComparator();
		List arrayList = new ArrayList(locationMap.entrySet());
        Collections.sort(arrayList, c);
        List<PieChart> chartdatas = new ArrayList<PieChart>();
        for (int i = 0; i < arrayList.size() && i < COLOR.length; i++) {
        	String name = ((Map.Entry) arrayList.get(i)).getKey().toString();
        	int value = (Integer)(((Map.Entry) arrayList.get(i)).getValue());
        	PieChart chart = new PieChart(name, value, COLOR[i]);
        	chartdatas.add(chart);
        }
        return chartdatas;
    }
    @SuppressWarnings({ "rawtypes", "unchecked" })
    class ValueComparator implements Comparator {
    	 public int compare(Object o1, Object o2) {
             Map.Entry obj1 = (Map.Entry) o1;
             Map.Entry obj2 = (Map.Entry) o2;
             return ((Integer) obj2.getValue()).compareTo((Integer) obj1
                     .getValue());
         }
    }
    
}